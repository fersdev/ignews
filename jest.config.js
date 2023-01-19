module.exports = {
    testPathIgnorePatterns: ["/node_modules/", "/.next/"],
    setupFilesAfterEnv: [
        "<rootDir>/src/tests/setupTests.ts"
    ],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
    },
    moduleNameMapper: {
        '^[./a-zA-Z0-9$_-]+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      },
    testEnvironment: 'jest-environment-jsdom'
};