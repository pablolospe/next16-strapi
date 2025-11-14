'use server'

import { registerUserService } from "@/lib/strapi";
import { type FormState, SignupFormSchema } from "@/validations/auth";
import z from "zod";


export async function registerUserAction(prevState: FormState, formData: FormData): Promise<FormState> {
    console.log('Hello for Register User action');

    const fields = {
        username: formData.get('username') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };

    const validatedFields = SignupFormSchema.safeParse(fields)

    if (!validatedFields.success) {
        const flattenedErrors = z.flattenError(validatedFields.error)

        console.log('Validation errors:', flattenedErrors.fieldErrors);

        return { 
            success: false,
            message: 'Validation error',
            strapiErrors: null,
            zodErrors: flattenedErrors.fieldErrors,
            data: fields,
        }
    }
    
    const response = await registerUserService(validatedFields.data);

    if(!response || response.error){
     return { 
            success: false,
            message: 'Registration error',
            strapiErrors: response?.error,
            zodErrors: null,
            data: fields,
        }
    }


    return {
        success: true,
        message: 'Validation successfull',
        strapiErrors: null,
        zodErrors: null,
        data: fields,
    }
}