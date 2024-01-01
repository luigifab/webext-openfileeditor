#!/bin/bash
# Created L/13/11/2023
# Updated S/25/11/2023
#
# Copyright 2023 | Fabrice Creuzot (luigifab) <code~luigifab~fr>
# https://github.com/luigifab/webext-openfileeditor
#
# This program is free software, you can redistribute it or modify
# it under the terms of the GNU General Public License (GPL) as published
# by the free software foundation, either version 2 of the license, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but without any warranty, without even the implied warranty of
# merchantability or fitness for a particular purpose. See the
# GNU General Public License (GPL) for more details.

# created with help of chatgpt
# wait: !/var/www/a.b| or !/var/www/a.b:2|  if found, run geany or xdg-open
#while true; do

	data=""
	while IFS= read -n 1 -r input; do
		if [ "$input" = "|" ]; then
			break
		fi
		data="${data}${input}"
	done
	data=$(echo $data | cut -d'!' -f2-)

	# /var/www/a.b = 12
	if (( ${#data} >= 12 )); then

		echo -e "$(date +%FT%T%:z) $data" >> /tmp/openfileeditor.txt

		filename="$data"
		filenumb=0
		if [[ "$filename" == *":"* ]]; then
			filenumb="${filename##*:}"
			filename="${filename%:*}"
		fi

		# ###########################"
		# if you need to search and replace
		# for example, here, it replace:
		#  /var/www/pouet/pouet/robots.txt
		# by:
		#  /var/www/test/robots.txt
		#filename=$(echo "$filename" | sed 's/var\/www\/pouet\/pouet/var\/www\/test/')

		# if you need to search and replace with *
		# for example, here, it replace:
		#  /var/www/cool/zzx/app/code/community/Luigifab/Apijs/Block/Adminhtml/Rewrite/Gallery.php
		# by:
		#  /var/www/cool/code/*/src/app/code/community/Luigifab/Apijs/Block/Adminhtml/Rewrite/Gallery.php
		# then it update to:
		#  /var/www/cool/code/mage-apijs/src/app/code/community/Luigifab/Apijs/Block/Adminhtml/Rewrite/Gallery.php
		filename=$(echo "$filename" | sed 's/cool\/zzx\/app\/code\/community/cool\/code\/*\/src\/app\/code\/community/')
		shopt -s nullglob
		files=($filename)
		if [ ${#files[@]} -gt 0 ]; then
			filename="${files[0]}"
		fi

		echo -e "          update path to  $filename" >> /tmp/openfileeditor.txt
		# ###########################"

		if [[ $filename =~ [[:alnum:]_]+\.[[:alnum:]]+ ]]; then

			if [[ -f $filename ]]; then

				echo -e "               open file  $filename $filenumb" >> /tmp/openfileeditor.txt

				if command -v geany &> /dev/null; then
					if ((filenumb > 0)); then
						geany "$filename" +"$filenumb" &
					else
						geany "$filename" &
					fi
				else
					xdg-open "$filename" &
				fi
			fi
		fi
	fi
#done

printf "\x04\x00\x00\x00"
printf "\"ok\""