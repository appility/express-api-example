$(document).ready(function () {
  var WAIT_TO_USE_JOBID_TIME = 3000;

  function renderError() {
    var templateError = $("#template-error").html();
    var templateErrorScript = Handlebars.compile(templateReports);
    $("#inject-template-reports-numbers").append(html_1);
  }

  function handleServiceReportSuccess(data) {
    localStorage.setItem("service_report", JSON.stringify(data));
    const templateReports = $("#template-reports").html();
    const templateReportsScript = Handlebars.compile(templateReports);
    const templateReportsNumbers = $("#template-reports-numbers").html();
    const templateReportsNumbersScript = Handlebars.compile(
      templateReportsNumbers
    );
    if (data) {
      let html_1 = templateReportsNumbersScript(data);
      let html_2 = templateReportsScript({ items: data.service_reports });
      $("#inject-template-reports-numbers").empty().append(html_1);
      $("#inject-template-reports").empty().append(html_2);
    }
  }

  function handleError() {}

  function fetchReport(job_id) {
    $.get("/report/" + job_id, function (data) {
      handleServiceReportSuccess(data);
    });
  }

  function fetchData() {
    $.get("/getJobId").then(function (response) {
      setTimeout(
        function (job_id) {
          fetchReport(job_id);
        },
        WAIT_TO_USE_JOBID_TIME,
        response.job_id
      );
    }, handleError);
  }

  function checkForData() {
    var service_report = localStorage.getItem("service_report");
    if (service_report) {
      handleServiceReportSuccess(JSON.parse(service_report));
    } else {
      fetchData();
    }
  }

  checkForData();
});
