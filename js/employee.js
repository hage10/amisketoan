$(document).ready(function() {
    new EmployeePage();
});
class EmployeePage {
    constructor() {
        this.setupEvents();
        this.loadData();

    }
    debugger
    setupEvents() {

        try {
            //nhấn button thêm mới 
            $("#btnAdd").click(this.btnAddOnClick);
            $("#btnSaveAdd").click(this.btnSaveAddOnClick.bind(this));


            //nhấn button close thì ẩn form chi tiết
            $(".close-popup-icon").click(this.btnCloseOnClick);
            //ấn đồng ý ẩn dialog cảnh báo
            $(".agree-alert").click(function(e) {
                e.preventDefault();
                $(".m-dialog-notice").hide();
                $("[notvalid]")[0].focus();
            });

            $(document).on('blur', "[notvalid]", function(e) {
                //lấy giá trị
                const value = $(this).val();
                if (value) {
                    $(this).removeAttr("notvalid");
                }
            });
            $(document).on('blur', "[required]", function(e) {
                //lấy giá trị
                const value = $(this).val();
                if (value) {
                    $(this).removeAttr("notvalid");
                } else {
                    $(this).attr("notvalid", true);
                    $(this).attr("title", "Thông tin này không được để trống");
                }
            });
            $(document).on('dblclick', 'tr', function(e) {
                $("#employeeAdd").show();
            })
        } catch (error) {
            console.log(error);
        }
    }
    debugger
    /**********************************************************
     * lưu dữ liệu
     * author : Trung 08/06/2022
     **********************************************************/
    btnSaveAddOnClick(e) {
        try {
            //validate dữ liệu
            this.validateObject();
            // build đối tượng nhân viên

            //gọi api cất dữ liệu
        } catch (error) {
            console.log(error);
        }
    }


    validateObject() {
            try {
                //1. các thông tin bắt buộc nhập
                const employeeCode = $("#txtEmployeeCode").val();
                const employeeName = $("#txtEmployeeName").val();
                const employeeUnit = $("#txtEmployeeUnit").val();

                let isValid = true;
                let errorMsgs = [];
                if (!employeeCode) {
                    isValid = false;
                    errorMsgs.push("Mã nhân viên không được phép để trống");
                    $("#txtEmployeeCode").attr("notvalid", true);
                }
                if (!employeeName) {
                    isValid = false;
                    errorMsgs.push("Tên nhân viên không được phép để trống");
                    $("#txtEmployeeName").attr("notvalid", true);
                }
                if (!employeeUnit) {
                    isValid = false;
                    errorMsgs.push("Đơn vị không được phép để trống");
                    $("#txtEmployeeUnit").attr("notvalid", true);
                }
                //2. kiểm tra thông tin liên quan ngày tháng VD: ngày sinh nhỏ hơn ngày hiện tại
                //3. kiểm tra các dữ liệu có đúng định dạng hay không ->email phải đúng định dạng
                //4. kiểm tra các thông tin có đúng hay không: -> phòng ban có tồn tại trong hệ thống hay không
                //kiểm tra lại xem có lỗi validate không
                if (!isValid) {
                    $(".m-dialog-notice .alert-message").empty();
                    //hiển thị thông báo lỗi
                    for (const msg of errorMsgs) {
                        $(".m-dialog-notice .alert-message").append(`<div>- ${msg}</div>`);
                    }
                    $(".m-dialog-notice").show();
                    return;
                }
                //5. theo nghiệp vụ đặc thù của bài toán
            } catch (error) {
                console.log(error);
            }


        }
        /**********************************************************
         * hiển thị form thêm mới khi ấn button thêm mới nhân viên
         * author : Trung 08/06/2022
         **********************************************************/
    btnAddOnClick(e) {
            e.preventDefault();
            //1.hiển thị form chi tiết
            $("#employeeAdd").show();

            //2.tự sinh mới mã nhân viên lấy từ api và binding vào input mã nhân viên
            $.ajax({
                type: "GET",
                url: "https://amis.manhnv.net/api/v1/Employees/NewEmployeeCode",
                success: function(response) {
                    const employeeCode = response;
                    $("#txtEmployeeCode").val(employeeCode);
                    //3.  focus vào ô nhập liệu đầu tiên
                    $("#txtEmployeeCode").focus();
                }
            });
        }
        /**********************************************************
         * ẩn form thêm mới khi ấn button close
         * author : Trung 08/06/2022
         **********************************************************/
    btnCloseOnClick(e) {
        e.preventDefault();
        $("#employeeAdd").hide();
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
                        <input type="checkbox" class="checkbox-emp">
                    </td>
                    <td style="width : 120px">${empCode}</td>
                    <td style="width : 200px">${empName}</td>
                    <td style="width : 90px">${empGenderName}</td>
                    <td style="text-align : center; width : 100px">${dob}</td>
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