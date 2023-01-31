package vttp_csf.server.models;

import org.springframework.util.MultiValueMap;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Contact {

    private String name;
    private int phone;
    private String email;

    public String getName() {        return name;       }
    public void setName(String name) {        this.name = name;       }

    public int getPhone() {        return phone;        }
    public void setPhone(int phone) {        this.phone = phone;        }

    public String getEmail() {        return email;       }
    public void setEmail(String email) {        this.email = email;     }

    @Override
	public String toString() {
		return "Contact[name=%s, phone=%s, email=%s]".formatted(name, phone, email);
	}

    public JsonObject toJson() {
        return Json.createObjectBuilder()
                .add("name", name)
                .add("phone", phone)
                .add("email", email)
                .build();
    }

    public static Contact create(MultiValueMap<String, String> form) {
        Contact c = new Contact();
        c.setName(form.getFirst("name"));
        c.setPhone(Integer.parseInt(form.getFirst("phone")));
        c.setEmail(form.getFirst("email"));
        return c;
    }
}
