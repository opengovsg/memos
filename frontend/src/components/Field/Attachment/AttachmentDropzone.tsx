import { DropzoneInputProps, DropzoneState } from 'react-dropzone'
import { BiCloudUpload } from 'react-icons/bi'
import { chakra, Icon, Link, Text, useStyles } from '@chakra-ui/react'

interface AttachmentDropzoneProps {
  inputProps: DropzoneInputProps
  isDragActive: DropzoneState['isDragActive']
}

export const AttachmentDropzone = ({
  inputProps,
  isDragActive,
}: AttachmentDropzoneProps): JSX.Element => {
  const styles = useStyles()

  return (
    <>
      <chakra.input {...inputProps} data-testid={inputProps.name} />
      <Icon aria-hidden as={BiCloudUpload} __css={styles.icon} />

      {isDragActive ? (
        <Text>Drop the file here ...</Text>
      ) : (
        <Text>
          <Link disabled={inputProps.disabled}>Choose file</Link> or drag and
          drop here
        </Text>
      )}
    </>
  )
}
