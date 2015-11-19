cur_frm.cscript.allocated_room=function(doc,cdt,cdn)
{
	var rm_no=doc.allocated_room;
	frappe.call({
		method:'lodge.lodge.doctype.booking.booking.get_room_details',
		args:{room:rm_no},
		callback:function(r)
		{
			if(r.message)
			{
				alert("This Room is not available");
				cur_frm.set_value('allocated_room','');
				cur_frm.set_value('room_no','');
				cur_frm.set_value('building_name','');
				cur_frm.set_value('r_class','');
				cur_frm.set_value('rent','');
			}
			else
			{
			}
		}
	});
}
cur_frm.cscript.onload=function(doc,cdt,cdn)
{
	frappe.call({
			method:'lodge.lodge.doctype.room_change.room_change.get_customer_name',
			args:{},
			callback:function(r)
			{
				set_field_options('customer',r.message)
			}
		})
	frappe.call({
		method:'lodge.lodge.doctype.room_change.room_change.get_room',
		args:{},
		callback:function(r)
		{
			set_field_options('allocated_room',r.message)
			
		}
	})	
}
cur_frm.cscript.customer=function(doc,cdt,cdn)
{
	c=doc.customer;
	frappe.call({
		method:'lodge.lodge.doctype.room_change.room_change.customer_name',
		args:{n:c},
		callback:function(r)
		{
			cur_frm.set_value('customer_name',r.message)
		}
	})
}
cur_frm.cscript.allocated_room=function(doc,cdt,cdn)
{
	room=doc.allocated_room
	frappe.call({
		method:'lodge.lodge.doctype.room_change.room_change.get_room_detail',
		args:{r:room},
		callback:function(r)
		{
			var doclist=frappe.model.sync(r.message)
			cur_frm.set_value('room_no',doclist[0][0])
			cur_frm.set_value('building_name',doclist[0][1])
			cur_frm.set_value('r_class',doclist[0][2])
		}
	})
}