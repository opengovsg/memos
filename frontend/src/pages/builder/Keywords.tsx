import React, { useCallback, useEffect, useState } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { usePlateSelectors } from '@udecode/plate'
import _ from 'lodash'
import { Node } from 'slate'

import { getKeywords, serializeNodesToString } from '~pages/builder/util'
import { useEditor } from '~features/builder/EditorContext'

export const Keywords = (): JSX.Element => {
  const { previewParams, setPreviewParams } = useEditor()

  const { activeEditorId } = useEditor()
  const { value: getValue } = usePlateSelectors(activeEditorId)
  const value: Node[] | null = getValue()

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    addKey(name, value)
  }
  const addKey = useCallback(
    (name: string, value: string) => {
      setPreviewParams((prev) => ({
        ...prev,
        [name]: value,
      }))
    },
    [setPreviewParams],
  )
  const deleteKey = useCallback(
    (name: string) => {
      setPreviewParams((prev) => {
        delete prev[name]
        return prev
      })
    },
    [setPreviewParams],
  )

  useEffect(() => {
    if (value) {
      const textValue = serializeNodesToString(value || [])
      const keywords = getKeywords(textValue)
      _.difference(Object.keys(previewParams), keywords).forEach((k) =>
        deleteKey(k),
      )
      _.difference(keywords, Object.keys(previewParams)).forEach((key) =>
        addKey(key, `Value for ${key}`),
      )
    }
  }, [addKey, deleteKey, previewParams, value])

  return (
    <VStack align="start">
      <Text textStyle="h3">Fields Required</Text>

      <Box>
        {Object.keys(previewParams).map((word) => {
          return (
            <FormControl isRequired key={word}>
              <FormLabel htmlFor={word}>{word}</FormLabel>
              <Input
                name={word}
                placeholder={`Type a value`}
                defaultValue={previewParams[word]}
                onChange={handleOnChange}
              />
            </FormControl>
          )
        })}
      </Box>
    </VStack>
  )
}
