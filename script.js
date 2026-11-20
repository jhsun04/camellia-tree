const universities = [
    "서울대학교", "연세대학교", "고려대학교", "KAIST", "포항공과대학교",
    "성균관대학교", "한양대학교", "서강대학교", "중앙대학교", "경희대학교",
    "한국외국어대학교", "서울시립대학교", "이화여자대학교", "건양대학교"
];

const input = document.getElementById('univ-input');
const list = document.getElementById('univ-list');
const resultSpan = document.querySelector('#selected-result span');

// 목록을 그려주는 함수
function showList(items) {
    list.innerHTML = '';

    if (items.length === 0) {
        const li = document.createElement('li');
        li.textContent = '검색 결과가 없습니다.';
        li.style.color = '#999';
        list.appendChild(li);
        return;
    }

    items.forEach(univ => {
        const li = document.createElement('li');
        li.textContent = univ;
        
        li.addEventListener('click', function() {
            input.value = univ;
            resultSpan.textContent = univ;
            list.innerHTML = '';
        });

        list.appendChild(li);
    });
}

// 1. 입력창을 클릭(포커스)했을 때 전체 목록 보여주기
input.addEventListener('focus', function() {
    const query = this.value.trim();
    const filtered = universities.filter(univ => univ.includes(query));
    showList(filtered);
});

// 2. 글자를 입력할 때마다 필터링해서 보여주기
input.addEventListener('input', function() {
    const query = this.value.trim();
    const filtered = universities.filter(univ => univ.includes(query));
    showList(filtered);
});

// 3. 입력창 바깥을 클릭하면 목록 닫기
document.addEventListener('click', function(e) {
    if (e.target !== input) {
        list.innerHTML = '';
    }
});