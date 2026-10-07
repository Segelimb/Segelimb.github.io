const days = [
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота'
        ];

        const button_up = document.getElementById('button_day-up');
        const button_down = document.getElementById('button_day-down');

        const button_group_up = document.getElementById('button_group-up');
        const button_group_down = document.getElementById('button_group-down');

        const today = new Date();

        var indexDay = 0;
        var indexGroup = 11;
        if (today.getDay() == 0) indexDay = 5;
        else indexDay = today.getDay() - 1;


        var Schedule = [];
        var app = "https://script.google.com/macros/s/AKfycbyZ8K5_sD-c7Zfi2f6MomHbG5bknZYU3E49txmfpLvpwLwGEpyOSg6tc5hfAx4dRByn/exec",
        xhr = new XMLHttpRequest();
        xhr.open('GET', app);
        xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;

        if (xhr.status == 200) {
            try {
                var r = JSON.parse(xhr.responseText);
                Schedule = r["result"];
                updateTable();
            } catch(e) {}
        }
        }
        xhr.send()

        function updateTable ()
        {
            console.log(Schedule);
            document.getElementById('group_title').innerText = Schedule[indexGroup][0];
            document.getElementById('day_of_week').innerText = days[indexDay];
            for (var i = 0; i < 7; i++) {
                if (Object.keys(Schedule[indexGroup][indexDay + 1][i]).length == 2)
                {
                    document.getElementById(`practical${i + 1}_1`).style.width = '40%';
                    document.getElementById(`practical${i + 1}_2`).style.display = 'flex';
                    document.getElementById(`lecture${i + 1}_title`).innerText = Schedule[indexGroup][indexDay + 1][i][0][0];
                    document.getElementById(`lecture${i + 1}_lecturer`).innerText = Schedule[indexGroup][indexDay + 1][i][0][1];
                    document.getElementById(`lecture${i + 1}_auditorium`).innerText = Schedule[indexGroup][indexDay + 1][i][0][2];
                    document.getElementById(`practical${i + 1}_title`).innerText = Schedule[indexGroup][indexDay + 1][i][1][0];
                    document.getElementById(`practical${i + 1}_lecturer`).innerText = Schedule[indexGroup][indexDay + 1][i][1][1];
                    document.getElementById(`practical${i + 1}_auditorium`).innerText = Schedule[indexGroup][indexDay + 1][i][1][2];
                }
                else
                {
                    document.getElementById(`practical${i + 1}_1`).style.width = '87%';
                    document.getElementById(`practical${i + 1}_2`).style.display = 'none';
                    document.getElementById(`lecture${i + 1}_title`).innerText = Schedule[indexGroup][indexDay + 1][i][0];
                    document.getElementById(`lecture${i + 1}_lecturer`).innerText = Schedule[indexGroup][indexDay + 1][i][1];
                    document.getElementById(`lecture${i + 1}_auditorium`).innerText = Schedule[indexGroup][indexDay + 1][i][2];
                }
                }
        }

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

        button_group_up.addEventListener('click', function() {
        if (indexGroup > 0 ){
            indexGroup--;
            updateTable();
        }
        });
        button_group_down.addEventListener('click', function() {
        if (indexGroup < (Object.keys(Schedule).length - 1)){
            indexGroup++;
            updateTable();
        }
        });