import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import Select from "./Select";

const SignUp = ({ open, setOpen }) => {               
  const dispatch = useDispatch();
  const location = useLocation();

  const [isRegister, setIsRegister] = useState(true);
  const [accountType, setAccountType] = useState("ceo");
  const roles=["condidat","recruteur","ceo"];
  const handleChange = (event) => {
    setAccountType(event.target.value);
};
const [comptecom,setcomptecom]=useState(true);

  const [errMsg, setErrMsg] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  let from = location.state?.from?.pathname || "/";

  const closeModal = () => setOpen(false);

  const onSubmit = () => {};

  return (
    <>
      <Transition appear show={open || false}>
        <Dialog as='div' className='relative z-10 ' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto '>
            <div className='flex min-h-full items-center justify-center p-4 text-center '>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all '>
                  <Dialog.Title
                    as='h3'
                    className='text-xl font-semibold lwading-6 text-gray-900'
                  >
                    {isRegister ? "Create Account" : "Account Sign In"}
                  </Dialog.Title>

                  <div className='w-full flex items-center justify-center py-4 '>
                    <button
                      className={`flex-1 px-4 py-2 rounded text-sm outline-none ${
                        accountType === "condidat"
                          ? "bg-[#1d4fd862] text-blue-900 font-semibold"
                          : "bg-white border border-blue-400"
                      }`}
                      /*onClick={() => setAccountType("condidat")}*/
                      onClick={()=>setcomptecom(true)}
                    
                    >
                      User Account{console.log(accountType)}
                    </button>
                    {accountType==="ceo"&&comptecom&&<button
                      className={`flex-1 px-4 py-2 rounded text-sm outline-none ${
                        accountType !== "condidat"
                          ? "bg-[#1d4fd862] text-blue-900 font-semibold"
                          : "bg-white border border-blue-400"
                      }`}
                      /*onClick={() => setAccountType("")}*/
                      onClick={()=>setcomptecom(false)}
                    >
                      Company Account
                    </button>}
                    
                  </div>

                  <form
                    className='w-full flex flex-col gap-5'
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <TextInput
                      name='email'
                      label='Email Address'
                      placeholder='email@example.com'
                      type='email'
                      register={register("email", {
                        required: "Email Address is required!",
                      })}
                      error={errors.email ? errors.email.message : ""}
                    />

                    {isRegister && (
                      <div className='w-full flex gap-1 md:gap-2'>
                        <div
                          className={`${
                            accountType === "recruteur" ? "w-1/2" : "w-full"
                          }`}
                        >
                          <TextInput
                            name={
                              comptecom? "Name" : "name"
                            }
                            label={
                              comptecom
                                ? "Name"
                                : "Company Name"
                            }
                            placeholder={
                              comptecom
                                ? "eg. James"
                                : "Comapy name"
                            }
                            type='text'
                            register={register(
                              comptecom ? "Name" : "name",
                              {
                                required:
                                comptecom
                                    ? "Name is required"
                                    : "Company Name is required",
                              }
                            )}
                            error={
                              comptecom
                                ? errors.Name
                                  ? errors.Name?.message
                                  : ""
                                : errors.name
                                ? errors.name?.message
                                : ""
                            }
                          />
                        </div>

                        {accountType === "recruteur" &&comptecom &&isRegister && (
                          <div className='w-1/2'>
                            <TextInput
                              name='Name Company'
                              label='Name Company'
                              placeholder='name company'
                              type='text'
                              register={register("Name Company", {
                                required: "Name Company is required",
                              })}
                              error={
                                errors.Name ? errors.Name?.message : ""
                              }
                            />
                          </div>
                        )}
                      </div>
                    )}

                    <div className='w-full flex gap-1 md:gap-2'>
                      <div className={`${isRegister ? "w-1/2" : "w-full"}`}>
                        <TextInput
                          name='password'
                          label='Password'
                          placeholder='Password'
                          type='password'
                          register={register("password", {
                            required: "Password is required!",
                          })}
                          error={
                            errors.password ? errors.password?.message : ""
                          }
                        />
                      </div>

                      {/*isRegister && (
                        <div className='w-1/2'>
                          <TextInput
                            label='Confirm Password'
                            placeholder='Password'
                            type='password'
                            register={register("cPassword", {
                              validate: (value) => {
                                const { password } = getValues();

                                if (password != value) {
                                  return "Passwords do no match";
                                }
                              },
                            })}
                            error={
                              errors.cPassword &&
                              errors.cPassword.type === "validate"
                                ? errors.cPassword?.message
                                : ""
                            }
                          />
                        </div>
                      )*/
                     isRegister&&comptecom&&(
                      <Select setType={setAccountType}/>
                     )
                       }
                    </div>

                    {errMsg && (
                      <span
                        role='alert'
                        className='text-sm text-red-500 mt-0.5'
                      >
                        {errMsg}
                      </span>
                    )}
              
                { /*<div>
                  <label for="choix" className='text-sm outline-none'>role:</label>
    <select id="choix" name="choix">
        {roles.map((role)=>{
          {setAccountType(role)}
          <option value={role}>{role
          }</option>
        })}
        
    </select>
                  </div>*/}
                    <div className='mt-2'>
                      <CustomButton
                        type='submit'
                        containerStyles={`inline-flex justify-center rounded-md bg-blue-600 px-8 py-2 text-sm font-medium text-white outline-none hover:bg-blue-800`}
                        title={isRegister ? "Create Account" : "Login Account"}
                      />
                    </div>
                  </form>

                  <div className='mt-4'>
                    <p className='text-sm text-gray-700'>
                      {isRegister
                        ? "Already has an account?"
                        : "Do not have an account"}

                      <span
                        className='text-sm text-blue-600 ml-2 hover:text-blue-700 hover:font-semibold cursor-pointer'
                        onClick={() => setIsRegister((prev) => !prev)}
                      >
                        {isRegister ? "Login" : "Create Account"}
                      </span>
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SignUp;
