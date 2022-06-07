$(document).ready(function() {
    new EmployeePage();
});
class EmployeePage {
    constructor() {
        this.setupEvents();
        this.loadData();

    }
    setupEvents() {
        $("#btnAdd").click(function(e) {
            e.preventDefault();
            //hiển thị form chi tiết
            $("#employeeAdd").css({
                "display": "flex"
            });
        });
        $(".close-popup-icon").click(function(e) {
            e.preventDefault();
            $("#employeeAdd").hide();
        });

    }

    /**
     * Load dữ liệu
     * athor : trung 04/06/2022
     */
    loadData() {
        // làm trống danh sách nhân viên
        $('#tbListEmployee tbody').empty();
        // gọi api lấy dữ liệu
        $.ajax({
            type: "GET",
            url: "https://amis.manhnv.net/api/v1/Employees",
            success: function(response) {
                //xử lý dữ liệu
                var employees = response;
                for (const emp of employees) {
                    const empName = emp.EmployeeName;
                    const empCode = emp.EmployeeCode;
                    const empGenderName = emp.GenderName;
                    const empDepartmentName = emp.DepartmentName;
                    const empPosition = emp.EmployeePosition;
                    const empBankName = emp.BankName;
                    const empBankBranchName = emp.BankBranchName;
                    const empBankAccountNumber = emp.BankAccountNumber;
                    const empIdentityNumber = emp.IdentityNumber;
                    let dob = emp.DateOfBirth;

                    //Định dạng dữ liệu
                    //Định dạng ngày tháng : ngày/tháng/năm(01/01/2000)
                    dob = new Date(dob)
                        //Lấy ngày:
                    let date = dob.getDate() + 1;
                    date = date < 10 ? `0${date}` : date
                        //Lấy tháng:
                    let month = dob.getMonth();
                    month = month < 10 ? `0${month}` : month
                        //Lấy năm:
                    let year = dob.getFullYear();
                    dob = `${date}/${month}/${year}`

                    var trHTML = `<tr>
                    <td>
                        <input type="checkbox">
                    </td>
                    <td>${empCode}</td>
                    <td>${empName}</td>
                    <td>${empGenderName}</td>
                    <td>${dob}</td>
                    <td>${empIdentityNumber}</td>
                    <td>${empPosition}</td>
                    <td>${empDepartmentName}</td>
                    <td>${empBankAccountNumber}</td>
                    <td>${empBankName}</td>
                    <td>${empBankBranchName}</td>
                    <td>lkjasflkaj</td>
                </tr>`;
                    $('#tbListEmployee tbody').append(trHTML);
                }

            },
            error: function() {
                debugger
            }
        });
    }
}