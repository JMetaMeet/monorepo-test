if [ $# -ne 2 ]
  then
    echo "인자 입력 필요."
    echo "host 설치 방법 => sh cra-setup.sh 경로명 host"
    echo "remote 설치 방법 => sh cra-setup.sh 경로명 remote"
    exit 1
fi



#cra 설치. craco 사용하기위해 억지로 설치. 나중에 craco 가 cra5를 지원한다면 --force 삭제
echo "CRA 설치 수행"
#yarn create react-app $1 --template typescript
npx --force create-react-app $1 --template typescript


#불필요 파일, 폴더 삭제
echo "불필요 파일, 폴더 삭제 node_modules, package-lock.json"

rm -rf node_modules package-lock.json 
cd $1


#필수 라이브러리 설치
echo "jest 라이브러리 설치"
yarn add @types/testing-library__jest-dom


echo "craco 라이브러리 설치"
yarn add -D @craco/craco

rm -rf node_modules .gitignore

#craco 설정 셋팅
echo "craco 설정 셋팅"
if [ $2 = "host" ]
  then
    echo "host-mfe"
    curl -o .cracorc.js https://gist.githubusercontent.com/RamRam-V/4ce127270f3b74d1d019b94dae240ac2/raw/bc7d7d63ac59e8118add57ad3f6422bb2e1013f8/w5-cracorc-host
elif [ $2 = "remote" ]
  then 
    echo "remote-mfe"
    curl -o .cracorc.js https://gist.githubusercontent.com/RamRam-V/c374792ce4c93704a03b2de4acdc4678/raw/827211c3867ef2e3bcae0cc2ff47b994c783ebea/w5-cracorc-remote
fi


yarn
