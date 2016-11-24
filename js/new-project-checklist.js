$(document).ready(function() {
	init();
});

function init () {
	$('[data-tooltip="tooltip"]').tooltip({delay: {'show': 1000}});
	// Auto hide tooltips after 2 sec
	$('[data-tooltip="tooltip"]').on('shown.bs.tooltip', function () {
	    var that = $(this);
	    
	    var element = that[0];
	    if(element.myShowTooltipEventNum == null){
	        element.myShowTooltipEventNum = 0;
	    }else{
	        element.myShowTooltipEventNum++;
	    }
	    var eventNum = element.myShowTooltipEventNum;

	    setTimeout(function(){
	        if(element.myShowTooltipEventNum == eventNum){
	            that.tooltip('hide');
	        }
	        // else skip timeout event
	    }, 2000);
	});
	init_modals();
	save_buttons();
	upload_buttons();
	init_selects();
}

function save_buttons() {
	$(document).on('click','.btn.btn-success.save-item',function() {
		var element = $(this).attr('data-id'),
			checklist_value = $.trim($('#' + element).val());
		if (checklist_value == '') {
			swal({
		        title: 'Stop!!!',
		        text: 'Checklist value is required',
				type: 'warning',
				confirmButtonColor: '#4CAF50',
				confirmButtonText: 'OK',
		        closeOnConfirm: true
		    });
			return false;
		}
		save_checklist(element, checklist_value);
	});
	
	$(document).on('click','#btnSave',function() {
		save_error_relationship();
	});
}

function upload_buttons() {
	$.ajaxSetup({ headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') } });
	$(function () {
		$('.filestyle').each(function () {
			var id_name = $(this).attr('id'),
				btn_name = 'btn_' + id_name;
		    $(this).fileupload({
		    	autoUpload: false,
		        dataType: 'json',
	        	formData: {'code': id_name},
	        	add: function (e, data) {
		            $('#' + btn_name).off('click').on('click',function () {
		            	console.log('here');
		            	$('#' + btn_name).attr('disabled', true);
		        		data.submit();
					});
		        },
		        done: function (e, data) {
		        	var msg = data.result.msg;
		            $('#' + btn_name).removeAttr('disabled');
		            console.log('uploaded with message: '+  msg);
		            swal({
				        title: 'Uploaded!',
				        text: 'Excel file successfully uploaded and processed',
						type: 'success',
						confirmButtonColor: '#4CAF50',
						confirmButtonText: 'OK',
				        closeOnConfirm: true
				    });
		        },
		        progressall: function (e, data) {
			        var progress = parseInt(data.loaded / data.total * 100, 10);
			        //console.log(progress);
			        $('#progress .bar').css(
			            'width',
			            progress + '%'
			        );
			    }
		    });
		}).bind('fileuploadfail', function (e, data) {
			console.log(data.textStatus);
			console.log(data.jqXHR);
		});
	});
}

function save_checklist(code, checklist_value) {
	
}

function save_error_relationship() {
	
}

function init_modals() {
	$('#listViewModal').on('show.bs.modal', function (evt) {
		var invoker = $(evt.relatedTarget),
			element = $(invoker).attr('data-id');
		load_project_checklist(element);
	});
}

function load_project_checklist(element) {
	var date = new Date(),
		timestamp = date.getTime(),
		request;
}

function init_selects() {
	populate_roots();
	populate_trunks();
	populate_branches();
}

function populate_roots() {
	
}

function populate_trunks() {
	
}

function populate_branches() {
	
}