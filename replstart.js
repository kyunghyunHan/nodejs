/** 자바스크립트는 스트립트 언어는 스크립트 언어이므로 미리 컴파일을 하지 않아도 즉석에서 코드를실행할 수 있습니다. 
 * 노드도 비슷한 콘솔을 제공하는데 입력한 코드를 읽고 해석하고 결과물을 반환하고 종료할떄 까지 반복한다고 해서 REPL이라고 부른다
 * 
 * 맥이나 리눅스에서는 터미널을 열고 node를 입력
 *  $ node 
 * 
 * 프롬포트가 >모양으로 바뀌엇다면 자바스크립트 코드를 입력 가능 
 * 
 * const str = 'hello world. hello node';
 * 
 * consol.log(str);
Uncaught ReferenceError: consol is not defined
> console.log(str);
hello world,hello node
undefined
> 
위와 같이 나왔다면 성공

자바스크립트 실행

function helloworld(){
    consol.log('hello world');
    helloworld();
    

    
}

$node helloworld

helloworld.js실행
*/
