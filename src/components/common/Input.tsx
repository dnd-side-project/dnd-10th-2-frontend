/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useEffect
} from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles';
import { Flex } from '@/components/Wrapper';
import { XCircle } from '@/assets/XCircle';

export type InputVariant = 'default' | 'join';

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  value?: string;
  setValue?: () => void;
  type: InputVariant;
  errorText?: string;
  isError?: boolean;
  height?: number;
  multiline?: boolean;
  rightElement?: ReactNode;
  maxLength?: number;
}

/**
 * @default {HTMLInputElement} or {HTMLTextAreaElement}
 *
 * @param {string} errorText?: 에러 메시지
 * @param {boolean} isError?: 에러 여부
 * @param {number} height?: 높이 (defult: 52px)
 * @param {boolean} multiline?: 여러 줄 (default: false)
 * @param {ReactNode} rightElement?: 오른쪽에 들어갈 수 있는 element
 */
export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      value,
      setValue,
      type,
      placeholder = '내용 입력',
      errorText,
      isError = false,
      height = 52,
      multiline = false,
      maxLength,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      console.log(value);
    }, [value]);

    return (
      <Container>
        <Flex align="flex-start">
          {multiline ? (
            <TextAreaContainer value={value}>
              <StyledTextArea
                {...props}
                ref={ref as ForwardedRef<HTMLTextAreaElement>}
                placeholder={placeholder}
                spellCheck={false}
                height={height}
              />
              {maxLength && (
                <p>
                  {value === undefined ? '0' : value?.length}/{maxLength}
                </p>
              )}
            </TextAreaContainer>
          ) : (
            <InputContainer value={value}>
              <StyledInput
                {...props}
                ref={ref as ForwardedRef<HTMLInputElement>}
                placeholder={placeholder}
                spellCheck={false}
                isError={isError}
                height={height}
              />
              {type === 'join' && <XCircle onClick={setValue} />}
              {maxLength && (
                <p>
                  {value === undefined ? '0' : value?.length}/{maxLength}
                </p>
              )}
            </InputContainer>
          )}
        </Flex>
        {errorText && (
          <StyledHelperTextBox>
            <StyledHelperText>{errorText}</StyledHelperText>
          </StyledHelperTextBox>
        )}
      </Container>
    );
  }
);

const Container = styled(Flex)`
  width: 100%;

  flex-direction: column;
  align-items: flex-start;
`;

const StyledHelperTextBox = styled.div`
  margin-top: 6px;
  color: ${theme.palette.error};
`;

const TextAreaContainer = styled.div<{
  value?: string | number | readonly string[] | undefined;
}>`
  position: relative;
  width: 100%;

  color: ${({ value }) =>
    value !== undefined
      ? theme.palette.middle_gray2
      : theme.palette.light_gray3};

  p {
    position: absolute;
    right: 16px;
    bottom: 15px;
  }
`;

const InputContainer = styled.div<{
  value?: string | number | readonly string[] | undefined;
}>`
  position: relative;
  width: 100%;

  color: ${({ value }) =>
    value !== undefined
      ? theme.palette.middle_gray2
      : theme.palette.light_gray3};

  svg,
  p {
    position: absolute;
    right: 23px;
    top: 50%;
    transform: translateY(-50%);

    cursor: pointer;
  }

  p {
    right: 16px;
    cursor: default;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-text-fill-color: ${theme.palette.dark_gray2};
    //글자색
  }
`;
const StyledInput = styled.input<{
  isError: boolean;
  height?: number;
}>`
  width: 100%;
  padding: 16px 59px 16px 12px;

  box-sizing: border-box;

  background: ${theme.palette.light_white};
  border-radius: 8px;

  ${theme.typo.B1};
  color: ${theme.palette.dark_gray2};

  & + div {
    color: ${theme.palette.dark_gray2};
  }

  :focus {
    & + div {
      color: ${({ isError }) =>
        isError ? theme.palette.error : 'transparent'};
    }
    border: 1px solid
      ${({ isError }) => (isError ? theme.palette.error : 'transparent')};
  }

  ::placeholder {
    color: ${theme.palette.light_gray3};
  }
`;

const StyledTextArea = styled.textarea<{
  height?: number;
  isError?: boolean;
}>`
  width: 100%;
  height: ${({ height }) => (height ? height : 92)}px;
  padding: 16px 48px 16px 12px;

  box-sizing: border-box;

  background: ${theme.palette.light_white};
  border-radius: 8px;
  resize: none;

  ${theme.typo.B1};
  color: ${theme.palette.dark_gray2};

  :focus {
    border: 1px solid
      ${({ isError }) => (isError ? theme.palette.error : 'none')};
  }

  ::placeholder {
    color: ${theme.palette.light_gray3};
  }
`;

const StyledHelperText = styled.p`
  ${theme.typo.B7};
  color: ${theme.palette.error};
`;
