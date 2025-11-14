'use server'

type FormState = {
  success: boolean;
  message?: string;
  strapiErrors: { message: string } | null;
  zodErrors: any | null;
  data: {
    username: string;
    password: string;
    email: string;
  };
};

export async function registerUserAction(prevState: FormState, formData: FormData): Promise<FormState> {
    console.log('Hello for Register User action');

    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // For now, return the prevState or a new state
    return {
        success: false,
        message: undefined,
        strapiErrors: { message: 'Registration not implemented yet' },
        zodErrors: null,
        data: {
            username: username || '',
            email: email || '',
            password: password || '',
        },
    };
}