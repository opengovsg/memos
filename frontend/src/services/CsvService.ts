import { difference, keys } from 'lodash'
import Papa from 'papaparse'

import {
  getTemplateParameters,
  Template,
} from '~features/templates/TemplatesService'

export interface CsvInfo {
  csvFilename: string
  numRows: number
  firstRowParams: Record<string, string>
}

/**
 * Ensure that the keywords found in the template is all in the csv headers and each row.
 * TODO: We can verify compulsory parameters like UIN and UIN_Type
 */
export const validateCsv = async ({
  file,
  template,
}: {
  file: File
  template: Template
}): Promise<CsvInfo> => {
  const csvFilename = file.name
  const requiredParams = getTemplateParameters(template)
  return new Promise((resolve, reject) => {
    let firstRowParams: Record<string, string> = {}
    let count = 0
    Papa.parse(file, {
      header: true,
      skipEmptyLines: 'greedy', // greedy - skip lines with only whitespace
      step: (
        step: Papa.ParseStepResult<Record<string, string>>,
        parser: Papa.Parser,
      ) => {
        try {
          count++
          if (step.errors && step.errors.length) {
            // Get first error from list of errors
            throw new Error(step.errors[0].message)
          }
          const row = step.data
          validateRow(row, requiredParams)
          if (count === 1) {
            firstRowParams = row
          }
        } catch (e) {
          parser.abort()
          return reject(
            new Error(
              `The following error occured while validating the CSV.\n
                Please check that the CSV file matches the provided sample.\n\n${e}`,
            ),
          )
        }
      },
      complete: () => {
        if (!count) {
          return reject(
            new Error('CSV file cannot be empty, fill up rows and try again.'),
          )
        }
        resolve({
          csvFilename,
          numRows: count,
          firstRowParams,
        })
      },
    })
  })
}

// Validate row has required headers
const validateRow = (
  row: Record<string, string>,
  requiredParams: Array<string>,
): boolean => {
  const params = keys(row)
  const missingParams = difference(requiredParams, params)
  if (missingParams.length) {
    throw new Error(`Missing params: ${missingParams.join(',')}`)
  }
  return true
}
