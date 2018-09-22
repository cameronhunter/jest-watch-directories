if [[ ! -z "${npm_config_user_agent}" ]] && [[ "${npm_config_user_agent}" == *'yarn'* ]]; then
    function cyan {
        echo "\x1B[36m${@}\x1B[0m"
    }

    echo -e "To support One Time Passwords (OTP), please use $(cyan npm) to publish.\n"

    exit 1
fi
