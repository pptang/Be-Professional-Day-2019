#!/bin/bash
# For removing this.xxx = this.xxx.bind(this); statement
codemod -d ../mechef/frontend/components/ --extensions js \
    'this.*=.*bind\(this\);' \
    ''