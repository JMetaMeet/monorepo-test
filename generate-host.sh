if [ $# -eq 0 ]
  then
    echo "인자 입력 필요."
    exit 1
fi




git clone https://github.com/JMetaMeet/monorepo-host-template.git $1
rm -rf $1/.git