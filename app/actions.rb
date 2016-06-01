# Homepage (Root path)
get '/' do
  erb :index
end

get '/api/contacts' do
	@contacts = Contact.all
	json @contacts.as_json ## as_json converts to an array of hash, json converts to string
end

post '/api/contact/save' do
	contact = Contact.new(params)
  unless contact.valid?
  	puts contact.errors.full_messages
  	{success: false, message: @contact.errors.full_messages}.to_json
  else
  	contact.save
  	contact.to_json
  end
	if contact.save
		contact.to_json
	end
end 

post 'api/contact/update' do
	contact = Contact.find()

end