To run tests with "CI=true npm test", comment out line 11 
"const showRemoveButton = blog.user.username === loggedUser.username"
from src/components/Blog.js and
uncomment line 12 "const showRemoveButton = false".

To run the tests, the next modifications had to be done

npm install --save-dev jest
npm install @babel/preset-env --save-dev

added jest to package.json with following content

"jest": {
    "transform": {
      "^.+\\.(js|ts)$": "babel-jest"
    },
    "transformIgnorePatterns": []
  }

created babel.config.json file with following content: 

{
  "presets": ["@babel/preset-env"]
}

source: https://stackoverflow.com/questions/75562251/babel-and-jest-configuration-syntaxerror-cannot-use-import-statement-outside-a 

NOTE: This has caused a config error that is visible when executing 

npm start

(has something to do with eslintrc.js file).