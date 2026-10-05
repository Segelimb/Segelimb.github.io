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
        var indexGroup = 14;
        if (today.getDay() == 0) indexDay = 5;
        else indexDay = today.getDay() - 1;


        var Schedule = [];
        var app = "https://script.google.com/macros/s/AKfycbzBJdLEHsBqCy0UH2xFMQvo5s83EHX-jsBZNVIELckjMFKw1Ew6JlBrB5Zpgo4IENf3/exec",
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
                document.getElementById(`lecture${i + 1}_title`).innerText = Schedule[indexGroup][indexDay + 1][i][0][0];
                document.getElementById(`lecture${i + 1}_lecturer`).innerText = Schedule[indexGroup][indexDay + 1][i][0][1];
                document.getElementById(`lecture${i + 1}_auditorium`).innerText = Schedule[indexGroup][indexDay + 1][i][0][2];
                document.getElementById(`practical${i + 1}_title`).innerText = Schedule[indexGroup][indexDay + 1][i][1][0];
                document.getElementById(`practical${i + 1}_lecturer`).innerText = Schedule[indexGroup][indexDay + 1][i][1][1];
                document.getElementById(`practical${i + 1}_auditorium`).innerText = Schedule[indexGroup][indexDay + 1][i][1][2];
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