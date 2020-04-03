#!/bin/bash

# ================================================================================================================================================ #
# AUXILIAR FUNCTIONS
# ================================================================================================================================================ #

# Get the OS value
sysName=$(uname -a | tr '[:upper:]' '[:lower:]')

# Print titles
function printTitle() {
	echo $'\n'"=============================================================================================="
	echo $1$'\n'"=============================================================================================="
}

# Auxiliar function to get ChromeDriver processes
function getChromeDriverProcesses() {
	if [[ $sysName == *"w64"* ]] || [[ $sysName == *"w32"* ]]; then echo $(tasklist | grep hrome | grep river); return; fi
	echo $(ps -aux | grep hrome | grep river)
}

# Auxiliar function to Delete a given PID process
function killProcess() {
	if [[ $sysName == *"w64"* ]] || [[ $sysName == *"w32"* ]]; then taskkill //F //PID $1; return; fi
	kill -9 $1
}

function removeAllChromeDrivers() {
	# Get the OS value
	sysName=$(uname -a | tr '[:upper:]' '[:lower:]')

	# Clean all Chromedriver sessions depending on which system are we working on
	printTitle "Checking Chromedriver sessions open"
	driverProcesses=$(getChromeDriverProcesses)
	while [ ${#driverProcesses} -gt 2 ]; do
		echo $'\n'"ChromeDriver sessions still open:"$'\n'"-----------------------------------------------------------------------"
		echo $(getChromeDriverProcesses)
		echo "-----------------------------------------------------------------------"
		# Get the PID value
		pid="false"
		re='^[0-9]+$' # Only numbers regex (the PID must be numbers only)
		for word in $(getChromeDriverProcesses); do
			if [[ $pid == *"true"* ]] && [[ $word =~ $re ]]; then pid=$word; break; fi
			pid="true"
		done
		# Kill the PID
		echo "PID to kill: [$pid]"
		killProcess $pid
		echo "-----------------------------------------------------------------------"
		sleep 1s
		driverProcesses=$(getChromeDriverProcesses)
	done
	printTitle "All Chromedriver sessions closed"
}

function getCredentialsFile() {

	# If the file does not exists download it. In the SQASH env, the password is in the ENV param $CRED_KEY. If not, ask for the pass
	echo $'\n'"File ['./credentials.json'] is not present in the project root. Proceeding to download the Credentials file..."$'\n'

	# If the $PROJECT_CREDS do not exist, must be input by the user:
	if [[ ${#CREDS_PASS} -lt 2 ]]; then read -ep "Please input the Credentials PASS: " CREDS_PASS; export CREDS_PASS; fi

	# Execute the 'getCredentials' function:
    node ./credentialsManager.js

	# Download the credentials
	if [ ! -f "./credentials.json" ]; then read -ep $'\n'"Incorrect PASS, please try again. Press ENTER to continue" a; exit -1; fi
}

# ================================================================================================================================================ #
# MAIN FUNCTION
# ================================================================================================================================================ #

if [[ $# -ne 3 ]]; then
	printTitle "Wrong amount of paramenters. Usage: 'test_run.sh {env} {test_tag} {headless: true/false}"
	exit -1
fi

# If the first arg == 'report' then we serve the Allure server (installing dependencies if necessary)
if [[ $1 == *"report"* ]]; then
	printTitle "Running the Allure Test Report tool"
	# Install 'allure-commandline' if not present
	if [[ ! -d "./node_modules/allure-commandline" ]]; then
		echo "Installing Allure test reporting tool"
		npm install allure-commandline --save-dev
	fi
	npx allure serve output

# If the first arg == 'clean' then the 'output' folder is cleaned before testing
elif [[ $1 == *"clean"* ]]; then
	echo "Cleaning 'Output' folder before testing"
	rm -rf ./output/*
elif [[ $1 == *"credentials"* ]]; then
	echo "Removing [./credentials.json] file"
	rm -rf ./credentials.json
	getCredentialsFile
else	
	# Install the Node dependencies if the /node_modules folder is not present
	if [[ ! -d "./node_modules" ]]; then
		printTitle "Installing the npm dependencies"
		npm run build
	fi

	# If the ./credentials file exists, do nothing
	printTitle "Generating Credentials"
	if [ ! -f "./credentials.json" ]; then getCredentialsFile; fi
	echo $'\n'"File ['./credentials.json'] already exists, running the tests..."

	# If the Headless param is 'true', set up the conf file
	if [[ $3 == *"true"* ]]; then
		printTitle "Running in headless mode"
		sed --in-place 's|  //args:|  args:|g' codecept.conf.js
	else
		printTitle "Running in standard mode"
		sed --in-place 's|  args:|  //args:|g' codecept.conf.js
	fi
	echo ""

	# Run the tests (if @testag == 'test', all tests are executed and the test argument passed is none '')
	tty=$(tty)
	testTag="--grep @$2"
	if [[ $2 == *"test"* ]]; then testTag="--grep samplTests --invert"; fi
	resultOutput=$(node node_modules/codeceptjs/bin/codecept.js run --steps --verbose -o "{\"env\":\"$1\"}" $testTag 2>&1 | tee $tty)
	# If we are running in a not TTY environment, just print the output in the default console
	if [[ $tty == *"not a tty"* ]]; then echo "$resultOutput"; fi

	# Clean all Chromedriver sessions depending on which system are we working on
	removeAllChromeDrivers

	# Determine the exit code. If the latest part of the script contains 'FAIL', return a negative exit code
	if [[ $resultOutput == *"FAIL  |"* ]]; then
		printTitle "The testrun contains FAILED Scenarios, returning fail code [-1]"; exit -1;
	else
		printTitle "The testrun only contains PASS Scenarios, returning success code [0]"; exit 0;
	fi
fi

# ================================================================================================================================================ #
# END OF SCRIPT
# ================================================================================================================================================ #