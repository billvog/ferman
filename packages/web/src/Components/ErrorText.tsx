import React from "react";
import styled from "styled-components";
import { VscError } from "react-icons/vsc";

interface ErrorTextProps {}

export const ErrorText: React.FC<ErrorTextProps> = ({ children }) => {
  return (
    <ErrorWrapper>
      <ErrorTextContainer>
        <ErrorIconContainer>
          <VscError />
        </ErrorIconContainer>
        {children}
      </ErrorTextContainer>
    </ErrorWrapper>
  );
};

const ErrorWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
`;

const ErrorIconContainer = styled.div`
  margin-right: 10px;
  line-height: 0.9;
`;

const ErrorTextContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 4px;
  padding: 12px 24px;
  color: var(--error);
  text-align: center;
  font-weight: 600;
  font-size: 12pt;
`;
