const days = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
];

    const select = document.getElementById('group');

    const button_up = document.getElementById('button_day-up');
    const button_down = document.getElementById('button_day-down');

    const button_week = document.getElementById('button_week');
    const button_week2 = document.getElementById('button_week2');

    const today = new Date();

    var indexDay = 0;
    var indexGroup = getCookie('group') || 0;
    if (today.getDay() == 0) indexDay = 5;
    else indexDay = today.getDay() - 1;
    var indexWeek = 0;

    var Schedule = [];
    request();

    function request()
    {
        var app = "https://script.google.com/macros/s/AKfycbyZ8K5_sD-c7Zfi2f6MomHbG5bknZYU3E49txmfpLvpwLwGEpyOSg6tc5hfAx4dRByn/exec",
        xhr = new XMLHttpRequest();
            xhr.open('GET', app + `?week=${indexWeek}`);
            xhr.onreadystatechange = function() {
                if (xhr.readyState !== 4) return;
    
                if (xhr.status == 200) {
                    try {
                        var r = JSON.parse(xhr.responseText);
                        Schedule = r["result"];
                        updateGroup();
                        updateTable();
                        updateWeek();
                    } catch(e) {}
                }   
            }
        xhr.send()
    }

    function updateGroup ()
    {
        for (var i = 0; i < Object.keys(Schedule[1]).length; i++) {
            document.getElementById("group").add(new Option(Schedule[1][i][0], i));
        }
        const group = document.getElementById('group');
        group.value = indexGroup;
    }

    function updateWeek ()
    {
        document.getElementById("button_week").innerHTML = (Schedule[0][0].slice(0, 10) + "<wbr>" + Schedule[0][0].slice(10));
        document.getElementById("button_week2").innerHTML = (Schedule[0][1].slice(0, 10) + "<wbr>" + Schedule[0][1].slice(10));
        if (Object.keys(Schedule[0].length) == 1)
        {
            document.getElementById("button_week").className = "button_week";
            document.getElementById("button_week2").style.display = "none"; 
        }
    }

    function updateTable ()
    {
        console.log(Schedule);
        document.getElementById('day_of_week').innerText = days[indexDay];
        for (var i = 0; i < 7; i++) {
            if (Object.keys(Schedule[1][indexGroup][indexDay + 1][i]).length == 2)
            {
                document.getElementById(`practical${i + 1}_1`).style.width = '43%';
                document.getElementById(`practical${i + 1}_2`).style.display = 'flex';
                document.getElementById(`lecture${i + 1}_title`).innerText = Schedule[1][indexGroup][indexDay + 1][i][0][0];
                document.getElementById(`lecture${i + 1}_lecturer`).innerText = Schedule[1][indexGroup][indexDay + 1][i][0][1];
                document.getElementById(`lecture${i + 1}_auditorium`).innerText = Schedule[1][indexGroup][indexDay + 1][i][0][2];
                document.getElementById(`practical${i + 1}_title`).innerText = Schedule[1][indexGroup][indexDay + 1][i][1][0];
                document.getElementById(`practical${i + 1}_lecturer`).innerText = Schedule[1][indexGroup][indexDay + 1][i][1][1];
                document.getElementById(`practical${i + 1}_auditorium`).innerText = Schedule[1][indexGroup][indexDay + 1][i][1][2];
            }
            else
            {
                document.getElementById(`practical${i + 1}_1`).style.width = '100%';
                document.getElementById(`practical${i + 1}_2`).style.display = 'none';
                document.getElementById(`lecture${i + 1}_title`).innerText = Schedule[1][indexGroup][indexDay + 1][i][0];
                document.getElementById(`lecture${i + 1}_lecturer`).innerText = Schedule[1][indexGroup][indexDay + 1][i][1];
                document.getElementById(`lecture${i + 1}_auditorium`).innerText = Schedule[1][indexGroup][indexDay + 1][i][2];
            }
        }
    }

    select.addEventListener('change', event=> {
        indexGroup = event.target.value;
        setCookie('group', indexGroup);
        updateTable();
    });

    button_up.addEventListener('click', function() {
        if (indexDay > 0 ){
            indexDay--;
            updateTable();
        }
    });

    button_down.addEventListener('click', function() {
        if (indexDay < 5 ){
            indexDay++;
            updateTable();
        }
    });

    function setCookie(name, value, days = 365) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Lax`;
    }

    function getCookie(name) {
        const matches = document.cookie.match(
            new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
        );
            return matches ? decodeURIComponent(matches[1]) : null;
    }

    button_week.addEventListener('click', function() {
        if (document.getElementById("button_week").className != "button_week active")
        {
            document.getElementById("button_week2").className = "button_week";
            document.getElementById("button_week").className = "button_week active";
            indexWeek = 0;
            request();
        }
    });

    button_week2.addEventListener('click', function() {
        if (document.getElementById("button_week2").className != "button_week active")
        {
            document.getElementById("button_week").className = "button_week";
            document.getElementById("button_week2").className = "button_week active";
            indexWeek = 1;
            request();
        }
    });