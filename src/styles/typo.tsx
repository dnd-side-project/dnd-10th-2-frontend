import { css } from '@emotion/react';

export const calcRem = (px: number) => `${px / 16}rem`;

export const typo = {
  T1: css`
    font-family: 'Pretendard', 'Apple SD Gothic Neo';
    font-size: ${calcRem(46)};
    font-weight: 300;
    line-height: ${calcRem(52)};
    letter-spacing: -0.6px;
  `,
  T2: css`
    font-family: 'Pretendard', 'Apple SD Gothic Neo';
    font-size: ${calcRem(24)};
    font-weight: 600;
    line-height: ${calcRem(34)};
    letter-spacing: -0.6px;
  `,
  T3: css`
    font-family: 'Pretendard', 'Apple SD Gothic Neo';
    font-size: ${calcRem(22)};
    font-weight: 600;
    line-height: ${calcRem(30)};
    letter-spacing: -0.6px;
  `,
  T4: css`
    font-family: 'Pretendard', 'Apple SD Gothic Neo';
    font-size: ${calcRem(20)};
    font-weight: 600;
    line-height: ${calcRem(28)};
    letter-spacing: -0.6px;
  `,
  T5: css`
    font-family: 'Pretendard', 'Apple SD Gothic Neo';
    font-size: ${calcRem(18)};
    font-weight: 600;
    line-height: ${calcRem(24)};
    letter-spacing: -0.6px;
  `,
  T6: css`
    font-family: 'Pretendard', 'Apple SD Gothic Neo';
    font-size: ${calcRem(18)};
    font-weight: 500;
    line-height: ${calcRem(28)};
    letter-spacing: -0.6px;
  `,
  T7: css`
    font-family: 'Pretendard', 'Apple SD Gothic Neo';
    font-size: ${calcRem(16)};
    font-weight: 600;
    line-height: ${calcRem(28)};
    letter-spacing: -0.6px;
  `,
  L: css`
    font-family: 'Pretendard', 'Apple SD Gothic Neo';
    font-size: ${calcRem(18)};
    font-weight: 700;
    line-height: ${calcRem(28)};
    letter-spacing: -0.6px;
  `,
  M1: css`
    font-family: 'Pretendard', 'Apple SD Gothic Neo';
    font-size: ${calcRem(16)};
    font-weight: 700;
    line-height: ${calcRem(24)};
    letter-spacing: -0.6px;
  `,
  M2: css`
    font-family: 'Pretendard', 'Apple SD Gothic Neo';
    font-size: ${calcRem(14)};
    font-weight: 500;
    line-height: ${calcRem(28)};
    letter-spacing: -0.6px;
  `,
  S: css`
    font-family: 'Pretendard', 'Apple SD Gothic Neo';
    font-size: ${calcRem(12)};
    font-weight: 500;
    line-height: ${calcRem(18)};
    letter-spacing: -0.6px;
  `,
  B1: css`
    font-family: 'Pretendard', 'Apple SD Gothic Neo';
    font-size: ${calcRem(16)};
    font-weight: 500;
    line-height: ${calcRem(20)};
    letter-spacing: -0.6px;
  `,
  B2: css`
    font-family: 'Pretendard', 'Apple SD Gothic Neo';
    font-size: ${calcRem(14)};
    font-weight: 600;
    line-height: ${calcRem(18)};
    letter-spacing: -0.6px;
  `,
  B3: css`
    font-family: 'Pretendard', 'Apple SD Gothic Neo';
    font-size: ${calcRem(14)};
    font-weight: 500;
    line-height: ${calcRem(20)};
    letter-spacing: -0.6px;
  `,
  B4: css`
    font-family: 'Pretendard', 'Apple SD Gothic Neo';
    font-size: ${calcRem(14)};
    font-weight: 400;
    line-height: ${calcRem(18)};
    letter-spacing: -0.6px;
  `,
  B5: css`
    font-family: 'Pretendard', 'Apple SD Gothic Neo';
    font-size: ${calcRem(13)};
    font-weight: 600;
    line-height: ${calcRem(18)};
    letter-spacing: -0.6px;
  `,
  B6: css`
    font-family: 'Pretendard', 'Apple SD Gothic Neo';
    font-size: ${calcRem(12)};
    font-weight: 400;
    line-height: ${calcRem(14)};
    letter-spacing: -0.6px;
  `,
  B7: css`
    font-family: 'Pretendard', 'Apple SD Gothic Neo';
    font-size: ${calcRem(12)};
    font-weight: 400;
    line-height: ${calcRem(20)};
    letter-spacing: -0.6px;
  `,
  B8: css`
    font-family: 'Pretendard', 'Apple SD Gothic Neo';
    font-size: ${calcRem(11)};
    font-weight: 400;
    line-height: ${calcRem(14)};
    letter-spacing: -0.6px;
  `
} as const;
