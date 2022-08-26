#!/bin/bash

src_dir=$1
dest_dir=$2

syncd()
{
	echo $1
	echo $2
}

syncdir()
{
	rsync -avu --progress $1 $2

	cd $2

	folders=($(ls))

	for (( idx=0 ; idx<${#folders[@]} ; idx++ ));
	do 
		inp=${folders[$idx]}

		echo $inp: $(ls "$inp" | wc -l);

		date_threshold=$(date --date '-25 days' +"%s")
		date_inp=$(date -d ${inp:0:8} +"%s")

		#    echo $date_threshold
		#    echo $date_inp

		if [[ $date_inp -le $date_threshold ]]
		then
			rm -rf $inp
			echo "$inp folder is older than 25 days. Shall be deleted"
		else
			echo "$inp folder is less than 25 days old"
		fi
	done
}

syncdir $src_dir $dest_dir
