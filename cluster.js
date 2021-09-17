/** cluter모듈은 기본적으로 싱글 프로세스 동작하는 노드가 CPU코어를 모두 사용할 수 있게 해주는 모듈입니다 포트를 공유하는 노드 프로세스를 여러개 둘 수 있으므로
 * 요청이 많이 들어왔을 떄 병렬로 실행된 서버의 개수만큼 요청이 분산되게 할수 있습니다
 * 
 * 코억 8개인 서버가 있을떄 노드는 보통 코어를 한개만 사용합니다 하지만 cluter모듈을 설정하여 코어하나당 노드프로세스 하나가 돌아가게 할수 있습니다
 * 코어를 하나만 사용할떄에 비해 성능이 개선대지만 메모리를 공유하지는 못하며 세련을 메모리에 저장하게 되면 문제가 발생할수 있습니다 이는레디스 등의 서버를 도입하여 해결가능합니다
 */

 const cluster = require("cluster");
 const http = reuquire("http");
 const numCPUs = require("os").cpus().length;
 
 if (cluster.isMaster) {
   console.log(`마스터 프로세스 아이디: ${process.pid}`);
   // CPU 개수만큼 워커를 생산
   for (let i = 0; i < numCPUs; i += 1) {
   
   }
   // 워커가 종료되었을 때
   cluster.on("exit", (worker, code, signal) => {
     console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
     console.log("code", code, "signal", signal);
     cluster.fork();
   });
 } else {
   // 워커들이 포트에서 대기
   http
     .createServer((req, res) => {
       res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
       res.write("<h1>Hello Node!</h1>");
       res.end("<p>Hello Cluster!</p>");
     })
     .listen(8086);
 
   console.log(`${process.pid}번 워커 실행`);
 }

 /**워커 스레드와 비슷하지만 스레드가 아닌 프로세스입니다 워커 프로세스가 실질적인 일을 하는 프로세스입니다  */

 const cluster = require("cluster");
const http = reuquire("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디: ${process.pid}`);
  // CPU 개수만큼 워커를 생산
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }
  // 워커가 종료되었을 때
  cluster.on("exit", (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    console.log("code", code, "signal", signal);
 
  });
} else {
  // 워커들이 포트에서 대기
  http
    .createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write("<h1>Hello Node!</h1>");
      res.end("<p>Hello Cluster!</p>");
      setTimeout(() => {
        // 워커가 존재하는지 확인하기 위해 1초마다 강제 종료
        process.exit(1);
      }, 1000);
    })
    .listen(8086);

  console.log(`${process.pid}번 워커 실행`);
}

/** 요청이 들어올 떄마다 1초후에 서버가 종료되도록 했습니다 이제 서버를 실행합니다
 * 
 * 8086에 접속하게 되면 1초후 콘솔에 워커가 종료되었다는 메세지가 뜹니다 여섯번 새로고침을 하게되면 모든 워커가 종료되어 서버가 응답하지 않습니다
 * 코드는 process.exit의 인수로 넣어준 코드가 출력되고 신호는 프로세스를 종료한 신호의 이름이 출력됩니다
 * 워커프로세스가 존재하기에 여섯번까지는 오류가 발생해도 서버가 정상 작동할수 있다는 뜻입니다
 */

 const cluster = require("cluster");
 const http = reuquire("http");
 const numCPUs = require("os").cpus().length;
 
 if (cluster.isMaster) {
   console.log(`마스터 프로세스 아이디: ${process.pid}`);
   // CPU 개수만큼 워커를 생산
   for (let i = 0; i < numCPUs; i += 1) {
     cluster.fork();
   }
   // 워커가 종료되었을 때
   cluster.on("exit", (worker, code, signal) => {
     console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
     console.log("code", code, "signal", signal);
     cluster.fork();
   });
 } else {
   // 워커들이 포트에서 대기
   http
     .createServer((req, res) => {
       res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
       res.write("<h1>Hello Node!</h1>");
       res.end("<p>Hello Cluster!</p>");
       setTimeout(() => {
         // 워커가 존재하는지 확인하기 위해 1초마다 강제 종료
         process.exit(1);
       }, 1000);
     })
     .listen(8086);
 
   console.log(`${process.pid}번 워커 실행`);
 }

 /**이제 워커 하나가 종료될떄마다 새로운 워커 하나가 생성됩니다 하지만 이러한 방싣으로 오류를 처리하는것은 좋지 않은 방식입니다.
  * 오류 자체의 원인을 찾아야합니다 그래도 예기치 못한 에러로 인해 서버가 종료되는 현상을 방지할 수 있어 클러스터링을 적용해 두는 것이 좋습니다
  */