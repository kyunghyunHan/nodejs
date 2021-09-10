/**모듈이란 특정한 기능을 하는 함수나 변수들의 잡합
 * 모듈로 만들어두면 여러 프로그램에 해당 모듈을 재사용 가능,자바스크립트에서는 코드를 재사용하기위해 함수로 만드는 것과 바슷
 * 보통 파일 하나가 모듈이댐
 * 
 * 모듈 재작
 * var.js와 func.js , index.js를 같은 폴더에 만들고 var.js를 작성\\
 * 
 * var.js
 * 
 * const odd = '홀수입니다';
 * const even = '짝수입니다';
 * 
 * module.exports ={
 * odd,
 * even,
 * };
 * 
 * var.js에 변수 2개를 선언 그리고 mpdule.exports에 변수들을 담은 객체를 대입
 * 이제 이파일은 모듈로서 기능
 * 이번에는 var.js를 참조라는 func.js를 작성
 * 
 * cosnt {odd,even} = require('./var');
 * 
 * function checkOddOrEven(num){
 * if (num %2){//홀수면
 * return odd;
 * }
 * return even;
 * }
 * 
 * module.exports =checlkOddOrEven;
 * 
 * require 함수안에 불로올 모듈의 경로를 작성  예제에서는 같은 폴더안에  파일을 만들었지만 다른 폴더에 있는 파일도 모듈로 사용이 가능 require함수의 인수로 제공하는 경로만 잘 지정하면 가능
 * 
 * var.js에서 변수를 불러온 뒤 숫자의 홀짝을 판별하는 함수를 선언 그리고 다시 module.exports 에 함수를 대입 이렇게 다른 모듈을 사용하는 파일을 다시 모듈로 작성이 가능
 * 
 * index.js
 * 
 * const {odd,even}= require('./var');
 * const checkNumber = require('./func');
 * 
 * function checkStringOddOrEven(str){
 * if (str.length % 2 ){ //홀수면
 *   return odd;
 * }
 * return even;
 * }
 * 
 * console.log(checkNumber(10));
 * console.log(checkStringOddOrEven('hello'));
 * 
 * index.js는 var.js func.js를 모두 참조 모듈 하나가 여러개의 모듈을 사용이 가능
 * 
 * $node index
 * 
 * 짝수입니다
 * 홀수입니다
 * 
 * 이렇게 여러파일에 걸쳐 재사용되는 함수나 변수를 모듈로 만들어두면 편리 그러나 모듈이 많아지고 모듈간의 관계가 얽히게 되면 구조를 파악하기 어렵다는 단점도 있음
 * 노드에서는 대부분의 파일이 다른 파일을 모듈로 사용 모듈로만들고 사용하는 방법을 꼭 알아야함
 * 
 * ES2015모듈
 * 
 * 자바스크립트도 자체 모듈 시스템 문법이 생김 이 문법은 노드의 문법과는 조금 다름
 * 
 * func.js를 ES2015 모둘스타일로 변경
 * 
 * func.mjs
 * 
 * import{odd,even} from '/var';
 * 
 * function checkOddOrEven(num){
 * if (num %2 ) {//홀수면
 *  return odd;
 * }
 * return even;
 * }
 * 
 * export default checkOddOrEven;
 * 
 * require와 module.exports 가 import,export defaul로 바뀜 상당한 부분에서 차이가 있으므로 단순히 글자만 바꿔서는 제대로 동작이 안될수도 잇음 다행이 위 에서는 require를 import로 module.
 * exports 를 export default를 바꾸기만 하면 댄다
 * 
 * 노드에서는 9버전부터 es2015모듈 시스템 사용가능 하지만 파일의 확장자을 mjs로 지정해야하는 제한이 생김 
 * 
 * 
 */