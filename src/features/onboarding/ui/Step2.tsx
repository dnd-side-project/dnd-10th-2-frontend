import styled from '@emotion/styled';
import { css } from '@emotion/react';

import {
  Step2Background,
  Step2Feature1,
  Step2Feature2,
  Step2Feature3,
  Step2Graphic
} from '@features/onboarding/assets';
import { Space } from '@/shared/common/ui';

export const Step2 = () => {
  return (
    <StyledContainer>
      <StyledBackground>
        <Step2Background />
      </StyledBackground>

      <StyledGraphic>
        <Step2Graphic />
      </StyledGraphic>

      <StyledContent>
        <StyledTitle1>자꾸 길어지는 회의시간,</StyledTitle1>
        <StyledTitle2>이제는 매니징이 필요할 때</StyledTitle2>

        <Space height={46.5} />

        <StyledFeature>
          <div
            css={css`
              margin-right: 3.6rem;
            `}>
            <StyledFeatureText1>팀원들과 함께 사용하는</StyledFeatureText1>
            <StyledFeatureText2>공유 타이머</StyledFeatureText2>
          </div>
          <Step2Feature1 />
        </StyledFeature>

        <Space height={10} />

        <StyledFeature>
          <div
            css={css`
              margin-right: 9.7rem;
            `}>
            <StyledFeatureText1>링크를 복사해</StyledFeatureText1>
            <StyledFeatureText2>회의실 공유</StyledFeatureText2>
          </div>

          <Step2Feature2 />
        </StyledFeature>

        <Space height={10} />

        <StyledFeature>
          <div
            css={css`
              margin-right: 6rem;
            `}>
            <StyledFeatureText1>회의가 끝난 후에도</StyledFeatureText1>
            <StyledFeatureText2>회의 메모 관리</StyledFeatureText2>
          </div>

          <Step2Feature3 />
        </StyledFeature>
      </StyledContent>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 12rem);
`;

const StyledBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledGraphic = styled.div`
  position: absolute;
  right: -1rem;
  bottom: 3.7rem;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTitle1 = styled.div`
  font-size: 2rem;
  font-weight: 500;
  line-height: 4.4rem;
  letter-spacing: -0.6px;
  color: ${({ theme }) => theme.palette.dark_gray2};
`;

const StyledTitle2 = styled.div`
  font-size: 2.8rem;
  font-weight: 700;
  line-height: 4.4rem;
  letter-spacing: -0.6px;
  color: ${({ theme }) => theme.palette.dark_gray2};
`;

const StyledFeature = styled.div`
  display: flex;
  align-items: center;
  width: 33.5rem;
  height: 12rem;
  border-radius: 1.3rem;
  border: 1px solid #bfd1ff;
  background: rgba(255, 255, 255, 0.38);
  backdrop-filter: blur(1.2px);
  padding-left: 2.95rem;
`;

const StyledFeatureText1 = styled.div`
  color: ${({ theme }) => theme.palette.black};
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 3.2rem;
  letter-spacing: -0.6px;
  color: ${({ theme }) => theme.palette.black};
`;

const StyledFeatureText2 = styled.div`
  color: ${({ theme }) => theme.palette.black};
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 3.2rem;
  letter-spacing: -0.6px;
  color: ${({ theme }) => theme.palette.black};
`;
