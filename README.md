# CODECEPTJS SAMPLE FRAMEWORK

## Automation Framework for Selenium/Webdriver using CodeceptJS and Gherkin

## Prerequsites
	- NodeJS (8.10+)
	- npm (6.0+)
	- Chrome (75.0+)

### Installation:
	npm run build

### Usage:
    npm test
        Mandatory Params: {environment} {test_tag} {headless: true/false}
        Optional: {no clean: no-clean}

    example: npm test prod samplTests false

### Test Reports (will install Allure if not in /node_modules yet):
	npm run report
	
This command will read the 'output' folder that is generated automatically upon running tests, load a webserver and open a page (in your default browser) with the test results:
![Allure test report](https://i.imgur.com/c20APkn.png)
