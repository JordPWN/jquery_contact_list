class CreateContactTable < ActiveRecord::Migration
  def change
  	create_table :contacts do |t|
  		t.string :first_name
  		t.string :last_name
  		t.string :email
  		t.string :phone
  		t.text	 :description

  		t.timestamps
  	end
  end
end
