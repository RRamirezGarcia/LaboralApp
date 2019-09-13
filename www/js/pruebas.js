var today = new Date();
var values = [];
values[0] = new Date().setDate(today.getDate() + 1);
values[1] = new Date().setDate(today.getDate() + 2);
var dateFrom = myApp.calendar({
    value: [values[0]],
    input: '#dateFrom',
    dateFormat: 'dd-mm-yyyy',
    closeOnSelect: true,
    minDate: today,
    onChange: function (p, values, displayValues)
    {
        try {

            if (dateTo.value < dateFrom.value)
            {
                dateTo.setValue([values[0]]);
            }
        } catch (e) {

        }
    }
});

dateFrom.setValue([values[0]]);
var dateTo = myApp.calendar({
    input: '#dateTo',
    dateFormat: 'dd-mm-yyyy',
    closeOnSelect: true,
    disabled: function (date)
    {
        if (date <= dateFrom.value)
        {
            return true;
        }
    }

});
dateTo.setValue([values[1]]);