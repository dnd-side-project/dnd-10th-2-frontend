// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Button, Flex, Header, Space, SvgIcon } from '@shared/common/ui';
// import { useGetMeetingList } from '@shared/main/apis';
// import { getCookie } from '@shared/common/utils';

import { FolderIcon } from '@features/main/assets';

// const menuList: {
//   id: number;
//   status: 'ongoing' | 'upcoming' | 'concluded';
//   text: string;
// }[] = [
//   { id: 0, status: 'ongoing', text: '진행 중인 회의' },
//   { id: 1, status: 'upcoming', text: '예정된 회의' },
//   { id: 2, status: 'concluded', text: '종료된 회의' }
// ];

const MainPage = () => {
  // const [currentStatus, setCurrentStatus] = useState<
  //   'ongoing' | 'upcoming' | 'concluded'
  // >('ongoing');

  const navigate = useNavigate();

  // const handleMenu = (status: 'ongoing' | 'upcoming' | 'concluded') => {
  //   setCurrentStatus(status);
  // };

  // const { data } = useGetMeetingList({
  //   status: currentStatus,
  //   token: getCookie('token')
  // });
  // console.log(data);

  return (
    <Flex
      direction="column"
      justify="space-between"
      css={css`
        min-height: 100vh;
      `}>
      {/* <div
        css={css`
          width: 100%;
          margin-bottom: 11.4rem;
        `}> */}
      <Header>
        <Header.Left>
          <SvgIcon id="hamburger_menu" />
        </Header.Left>
        <Header.Center>나의 회의실</Header.Center>
      </Header>

      <Space height={15.5} />

      <div>
        <FolderIcon />

        <div
          css={css`
            color: #989fae;
            text-align: center;
            font-size: 18px;
            font-weight: 500;
            line-height: 28px;
            letter-spacing: -0.6px;
            margin-top: 1.4rem;
          `}>
          아직 준비 중에요
        </div>
      </div>

      {/* <StyledMenuList>
          {menuList.map((menu) => (
            <StyledMenu key={menu.id} onClick={() => handleMenu(menu.status)}>
              <StyledMenuText isCurrentStatus={menu.status === currentStatus}>
                {menu.text}
              </StyledMenuText>

              {menu.status === currentStatus && <StyledMenuBar />}
            </StyledMenu>
          ))}
        </StyledMenuList> */}

      <Space height={30} />
      {/* </div> */}

      <StyledButton>
        <Button
          size="lg"
          backgroundColor="main"
          onClick={() => navigate('/meeting/create')}>
          회의 만들기
        </Button>
      </StyledButton>
    </Flex>
  );
};

// const StyledMenuList = styled.div`
//   display: flex;
//   width: 100%;
//   border-bottom: 1px solid #e2e6eb;
//   /* padding-bottom: 1.75rem; */
//   /* color: ${({ theme }) => theme.palette.middle_gray2}; */
//   font-size: 1.6rem;
//   font-weight: 600;
// `;

// const StyledMenu = styled.div`
//   width: calc(100% / 3);
// `;

// const StyledMenuText = styled.div<{ isCurrentStatus: boolean }>`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   color: ${({ isCurrentStatus, theme }) =>
//     isCurrentStatus ? theme.palette.black : theme.palette.middle_gray2};
//   margin-bottom: 1.75rem;
// `;

// const StyledMenuBar = styled.div`
//   width: 100%;
//   height: 2px;
//   background-color: ${({ theme }) => theme.palette.black};
//   border-radius: 1rem;
// `;

const StyledButton = styled.div`
  width: 100%;
  transform: translateY(-4.4rem);
`;

export default MainPage;
