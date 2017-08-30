'use strict';

const fs = require('fs-extra');
const path = require('path');
const findRoot = require('find-root');
const inquirer = require('inquirer');

const appRoot = findRoot(require.main.filename);
const componentRoot = path.join(appRoot, 'src', 'components');
const templatesPath = path.join(appRoot, 'templates');

// Everything happens here
takeInput();

/* Functions */
async function takeInput() {
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Component Name:',
      validate(input) {
        const pattern = /^[a-zA-Z]+$/;

        if (!pattern.test(input)) {
          return 'Name must be contain only letter characters (camelcase).';
        }

        const componentExists = checkComponentExists(input);

        if (componentExists) {
          return componentExists;
        }

        return true;
      },
    },
    {
      type: 'list',
      name: 'type',
      message: 'Component Type:',
      choices: [
        {
          name: 'Pure Function',
          value: 'pure',
        },
        {
          name: 'Class',
          value: 'class',
        },
      ],
      default: 0,
    },
  ];

  const prompt = inquirer.createPromptModule();

  const answers = await prompt(questions);

  createComponent(answers.name, answers.type);

  console.log(
    `Component ${answers.name} created in ${getComponentPath(answers.name)}`
  );
}

function checkComponentExists(name) {
  // if directory exists, respectfully bow out
  if (fs.existsSync(getComponentPath(name))) {
    return `Component directory src/${name} exists. Please choose a different component name.`;
  }

  return false;
}

function getComponentPath(name, basePath = componentRoot) {
  return path.join(basePath, name);
}

function createComponent(name, type, templatePath = templatesPath) {
  fs.mkdirSync(getComponentPath(name));

  const componentFileName =
    type === 'pure' ? 'component.jsx' : 'component-class.jsx';

  const componentPath = path.join(getComponentPath(name), 'index.jsx');
  const componentStylePath = path.join(getComponentPath(name), 'styles.less');
  const componentTestPath = path.join(
    getComponentPath(name),
    `${name}.stories.test.jsx`
  );

  const componentTemplatePath = path.join(
    templatePath,
    'component',
    componentFileName
  );
  const componentStyleTemplatePath = path.join(
    templatePath,
    'component',
    'styles.less'
  );
  const componentTestTemplatePath = path.join(
    templatePath,
    'component',
    'component.stories.test.jsx'
  );

  // copy templates to new folders
  fs.copySync(componentTemplatePath, componentPath);
  fs.copySync(componentTestTemplatePath, componentTestPath);
  fs.copySync(componentStyleTemplatePath, componentStylePath);

  // replace all instances of __component__ inside component.js and component.test.js with name
  const componentFile = fs.readFileSync(componentPath, { encoding: 'utf8' });
  const componentStyleFile = fs.readFileSync(componentStylePath, {
    encoding: 'utf8',
  });
  const componentTestFile = fs.readFileSync(componentTestPath, {
    encoding: 'utf8',
  });

  fs.writeFileSync(
    componentPath,
    componentFile.replace(/__component__/g, name)
  );
  fs.writeFileSync(
    componentStylePath,
    componentStyleFile.replace(/__component__/g, name)
  );
  fs.writeFileSync(
    componentTestPath,
    componentTestFile.replace(/__component__/g, name)
  );
}
