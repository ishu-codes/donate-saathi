import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/db";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    username: string
  ) => Promise<{ data: any; error: any }>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, username: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    return { data, error };

    // Optionally store additional user data in a separate table
    // if (data.user) {
    //   const { error: profileError } = await supabase
    //     .from('profiles')
    //     .insert([
    //       {
    //         id: data.user.id,
    //         username: username,
    //         email: email,
    //       },
    //     ]);

    //   if (profileError) throw profileError;
    // }

    // create table public.profiles (
    //   id uuid references auth.users on delete cascade primary key,
    //   username text unique not null,
    //   email text unique not null,
    //   created_at timestamp with time zone default timezone('utc'::text, now()) not null
    // );

    // -- Enable RLS
    // alter table public.profiles enable row level security;

    // -- Create policies
    // create policy "Public profiles are viewable by everyone."
    //   on profiles for select
    //   using ( true );

    // create policy "Users can insert their own profile."
    //   on profiles for insert
    //   with check ( auth.uid() = id );

    // create policy "Users can update own profile."
    //   on profiles for update
    //   using ( auth.uid() = id );
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
