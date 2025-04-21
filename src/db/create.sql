-- Ngo
create table public.ngo (
  id serial not null,
  name character varying(255) not null,
  description text not null,
  location character varying(255) not null,
  email character varying(255) not null,
  phone character varying(255) not null,
  website character varying(255) null,
  created_at timestamp without time zone null default CURRENT_TIMESTAMP,
  constraint ngo_pkey primary key (id),
  constraint ngo_email_key unique (email),
  constraint ngo_name_key unique (name),
  constraint ngo_phone_key unique (phone)
) TABLESPACE pg_default;

-- Tag
create table public.tag (
  id serial not null,
  name character varying(255) not null,
  constraint tag_pkey primary key (id),
  constraint tag_name_key unique (name)
) TABLESPACE pg_default;

-- Ngo Tag
create table public.ngo_tag (
  ngo_id integer not null,
  tag_id integer not null,
  constraint ngo_tag_pkey primary key (ngo_id, tag_id),
  constraint ngo_tag_ngo_id_fkey foreign KEY (ngo_id) references ngo (id) on delete CASCADE,
  constraint ngo_tag_tag_id_fkey foreign KEY (tag_id) references tag (id) on delete CASCADE
) TABLESPACE pg_default;

-- Campaign
create table public.campaign (
  id serial not null,
  name character varying(255) not null,
  description text not null,
  type integer not null,
  target integer not null,
  completed integer null default 0,
  ngo_id integer not null,
  started_by uuid null,
  created_at timestamp without time zone null default CURRENT_TIMESTAMP,
  image text null,
  constraint campaign_pkey primary key (id),
  constraint campaign_ngo_id_fkey foreign KEY (ngo_id) references ngo (id) on delete CASCADE,
  constraint campaign_started_by_fkey foreign KEY (started_by) references auth.users (id) on delete CASCADE,
  constraint campaign_type_fkey foreign KEY (type) references tag (id)
) TABLESPACE pg_default;


-- Donation Transaction
create table public.donation (
  id serial not null,
  type character varying(50) not null,
  campaign_id integer null,
  donor_id uuid not null,
  ngo_id integer null,
  amount integer null,
  quantity integer null,
  unit character varying(50) null,
  created_at timestamp without time zone null default CURRENT_TIMESTAMP,
  description text null default ''::text,
  constraint donation_pkey primary key (id),
  constraint donation_donor_id_fkey foreign KEY (donor_id) references auth.users (id) on delete CASCADE,
  constraint donation_ngo_id_fkey foreign KEY (ngo_id) references ngo (id) on delete CASCADE
) TABLESPACE pg_default;

-- Donations available
create table public.donation_available (
  id serial not null,
  type integer not null,
  donor_id uuid not null,
  amount integer null,
  quantity integer null,
  unit character varying(50) null,
  created_at timestamp without time zone null default CURRENT_TIMESTAMP,
  description text null default ''::text,
  title text null,
  constraint donation_available_pkey primary key (id),
  constraint donation_available_donor_id_fkey foreign KEY (donor_id) references auth.users (id) on delete CASCADE,
  constraint donation_available_donor_id_fkey1 foreign KEY (donor_id) references user_profiles (user_id),
  constraint donation_available_type_id_fkey foreign KEY (type) references tag (id) on delete CASCADE
) TABLESPACE pg_default;

create table public.donation_images (
  id serial not null,
  donation_id integer not null,
  image_url text not null,
  uploaded_at timestamp without time zone null default CURRENT_TIMESTAMP,
  constraint donation_images_pkey primary key (id),
  constraint donation_id_fkey foreign KEY (donation_id) references donation_available (id) on delete CASCADE
) TABLESPACE pg_default;


-- User profiles
create table public.user_profiles (
  user_id uuid not null,
  role character varying(50) not null default 'DONOR'::character varying,
  ngo_id integer null,
  created_at timestamp without time zone null default CURRENT_TIMESTAMP,
  location text null,
  constraint user_profiles_pkey primary key (user_id),
  constraint user_profiles_ngo_id_fkey foreign KEY (ngo_id) references ngo (id) on delete set null,
  constraint user_profiles_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE,
  constraint user_profiles_role_check check (
    (
      (role)::text = any (
        (
          array[
            'DONOR'::character varying,
            'ADMIN'::character varying,
            'VOLUNTEER'::character varying
          ]
        )::text[]
      )
    )
  )
) TABLESPACE pg_default;

-- Create the donation_requests table
CREATE TABLE public.donation_requests (
  id SERIAL PRIMARY KEY,
  donation_id INTEGER NOT NULL,
  requester_id UUID NOT NULL,
  reason TEXT,
  status VARCHAR(50) DEFAULT 'PENDING',
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  -- Foreign keys
  CONSTRAINT donation_requests_donation_id_fkey 
    FOREIGN KEY (donation_id) 
    REFERENCES public.donation_available(id) 
    ON DELETE CASCADE,
  
  CONSTRAINT donation_requests_requester_id_fkey 
    FOREIGN KEY (requester_id) 
    REFERENCES auth.users(id) 
    ON DELETE CASCADE
);