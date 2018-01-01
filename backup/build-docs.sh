#!/bin/bash

# Copyright 2017 Crunchy Data Solutions, Inc.
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

NAME=$1
OPERATION=$2

if [[ "$#" -le 1 ]]; then
  echo "Usage:"
  echo "   $0 <name> <operation>"
  echo "   - name: install | examples | metrics | pitr | smoketest | dedicated | containers | backrest"
  echo "   - operation: create | delete"
  exit
fi

function create {
  python asciidoc.py --no-header-footer -o ./$NAME.html ./$NAME.adoc
}

function delete {
  rm $NAME.html
}

case $OPERATION in
  create)
    create
    ;;
  delete)
    delete
    ;;
esac
