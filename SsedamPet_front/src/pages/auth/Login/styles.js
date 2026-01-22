import { css } from "@emotion/react";

export const rootContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

export const headerBar = css`
  width: 100%;
  max-width: 600px;
  height: 60px;
  background-color: #b7f2c9;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const headerTitle = css`
  color: white;
  font-size: 32px;
  font-weight: 700;
  margin: 0;
`;

export const loginContent = css`
  width: 100%;
  max-width: 600px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
`;

export const logoArea = css`
  margin-top: 80px;
  display: flex;
  justify-content: center;

  img {
    width: 400px;
    height: 300px;
  }
`;

export const socialSection = css`
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const socialText = css`
  width: 100%;
  display: flex;
  align-items: center;
  color: #85898b;
  font-size: 15px;
  margin-bottom: 40px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #e0e0e0;
    margin: 0 15px;
  }
`;

export const socialButtons = css`
  display: flex;
  gap: 30px;
`;

export const iconCircle = css`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

export const bottomNavBar = css`
  width: 100%;
  max-width: 600px;
  height: 90px;
  background-color: #f8fcf5;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.03);
  padding: 0 10px 10px 10px;
  box-sizing: border-box;
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: #444444;
    cursor: pointer;
    flex: 1;
    transition: all 0.2s ease;
    &:hover {
      opacity: 0.7;
    }
  }
  .nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      stroke-width: 1.5;
    }
  }
  .nav-label {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.5px;
  }
  .nav-item.active {
    color: #000000;
    .nav-label {
      font-weight: 800;
    }
  }
`;
