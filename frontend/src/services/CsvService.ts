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
    return Papa.parse(file, {
      header: true,
      preview: 1, // Only check the first row, for preview
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
          reject(
            new Error(
              `The following error occured while validating your CSV.\n
              Please check your CSV.\n\n${e}`,
            ),
          )
          parser.abort()
        }
      },
      complete: () => {
        if (!count) {
          reject(new Error('The fields in your CSV file cannot be empty.'))
        }
        resolve({
          csvFilename,
          numRows: count,
          firstRowParams,
        })
      },
      error: reject,
    })
  })
}

// Validate row has required headers and values
const validateRow = (
  row: Record<string, string>,
  requiredParams: Array<string>,
): void => {
  const params = keys(row)
  const missingParams = difference(requiredParams, params)
  if (missingParams.length) {
    throw new Error(`Missing header(s) - ${missingParams.join(',')}`)
  }
  const missingFields = params.filter((p) => !row[p])
  if (missingFields.length) {
    throw new Error(
      `Missing field(s) in row 1 for preview - ${missingFields.join(',')}`,
    )
  }
}
