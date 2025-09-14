import '@testing-library/jest-dom'
import 'jest-styled-components'
import { TextEncoder, TextDecoder } from "util";

module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
};


Object.assign(global, { TextEncoder, TextDecoder });

