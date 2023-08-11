import FormBtn from './FormBtn'
import FormInput from './FormInput'
import FormImage from '../image/FormImage'

export default function Form() {
  return (
    <form>
      <FormImage />
      <FormInput type="email" name="email" id="email" label="Email" required />
      <FormInput type="password" name="current_password" id="current_password" label="Current_password" />
      <FormInput type="password" name="new_password" id="new_password" label="New password" />
      <FormInput type="password_confirm" name="password_confirm" id="password_confirm" label="Confirm password" />
      <FormInput type="text" name="name" id="name" label="Name" required />
      <div class="grid md:grid-cols-2 md:gap-6">
        <FormInput type="tel" name="tel" id="tel" label="Tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
        <FormInput type="text" name="company" id="company" label="Company" />
      </div>
      <FormBtn />
    </form>
  )
}