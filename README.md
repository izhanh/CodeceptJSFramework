# CODECEPTJS SAMPLE FRAMEWORK

## Automation Framework for Selenium/Webdriver using CodeceptJS and Gherkin

## Prerequsites
	- NodeJS (8.10+)
	- npm (6.0+)
	- Chrome (75.0+)

### Installation:
	npm run build

### Usage:
    npm test {environment} {test_tag} {headless: true/false}
    example: npm test prod samplTests false

### Test Reports (will install Allure if not in /node_modules yet):
	npm run report
	
![Allure test report](https://imgur.com/a/2pltJOf)
