/** 스트림을 배울떄 on을 사용하였습니다 바로 data라는 이벤트와 end라는 이벤트가 발생할떄 콜백함수를 호춯하도록 이벤트를 등록한 것입니다
 * 이벤트를 만들고 호출하고 삭제하기
 * 
 */

const EventEmitter = require('events');

const myEvent = new EventEmitter();
myEvent.addListener('event1',()=>{
    console.log('이벤트1');
});
myEvent.on('event2',()=>{
    console.log('이벤트2');
});
myEvent.on('event2',()=>{
    console.log('이벤트 2추가');
});
myEvent.once('event3',()=>{
    console.log('이벤트 3');

});//한번만 실행됨


myEvent.emit('event1'); //이벤트호출
myEvent.emit('event2');//이벤트호출
myEvent.emit('event3');//이벤트호출
myEvent.emit('event3');//실행안됨

myEvent.on('event4',()=>{
    console.log('이벤트4');
});

myEvent.removeAllListeners('event4');
myEvent.emit('event4');//실행안댐

const listerner=()=>{
    console.log('이벤트5');
};
myEvent.on('event5',listerner);
myEvent.removeAllListeners('event5',listerner);
myEvent.emit('event5');//실행안됨

console.log(myEvent.listenerCount('event2'));

/**node event
 * 
 * 이베트1
 * 이벤트2
 * 이벤트2추가
 * 이벤트3
 * 2
 * 
 * events모듈을 사용하면 됩니다 myEvent라는 객체를 먼저 만듭니다 객체는 이벤트 관리를 위한 메서드를 가지고 있습니다
 * 
 * on(이벤트명,콜백) : 이벤트 이름과 이벤트 발생시의 콜백을 연결합니다 이렇게 연곃하는 동작을 이벤트리스닝이라고 부릅니다 event2처럼 이벤트 하나에 이벤트 여러개를 달아줄수도있씁니다
 * 
 * addListener(이벤트명,콜백) :on과 기능이 같습니다
 * 
 * emit(이벤트명):이벤트명을 호춯하는 메서드입니다 이벤트 이름을 인수로 넣으면 미리 등록해둿던 이벤트 콜백이 실행됩니다
 * 
 * once(이벤트명,콜백):한번만 실행되는 이벤트입니다 두번호출해도 한번만 실행됩니다
 * 
 * removeAllListeners(이벤트명) : 이벤트에 연결된 모든 이벤트 리스너를 제거합니다 event4가 호춯되기 이전에 리스너를 제거햿으므로 event4의 콜백이 호춯되지 않습니다
 * 
 * removeListener(이벤트명,리스너) : 이벤트에 연결된 리스너를 한개씩 제거합니다 리스너를 넣어야 한다는 것을 잊지 마세요 역시 event5의 콜백도 호춯되지 않습니다
 * 
 * off(이벤트명 ,콜백) :노드10버전에서 추가된 메서드로 removeListenew과 기능이 같습니다
 * 
 * listenerCount(이벤트명) :현재 리스너가 몇개 연결되있는지 확인합니다
 */