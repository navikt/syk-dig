#!/usr/bin/env bash

todo=$(grep -roh "TODO" src | wc -w)

echo -e " * $todo TODOs i koden"
