--below is new table that was done to support passing phone number
CREATE TABLE public.contact_registration (
    id bigint NOT NULL,
    phoneNumber character varying,
    registration_time timestamp without time zone,
    is_primary boolean,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);

ALTER TABLE public.contact_registration OWNER TO postgres;

CREATE SEQUENCE public.contact_registration_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.contact_registration_id_seq OWNER TO user;
ALTER SEQUENCE public.contact_registration_id_seq OWNED BY public.contact_registration.id;
ALTER TABLE ONLY public.contact_registration ALTER COLUMN id SET DEFAULT nextval('public.contact_registration_id_seq'::regclass);
SELECT pg_catalog.setval('public.contact_registration_id_seq', 1, true);
ALTER TABLE ONLY public.contact_registration ADD CONSTRAINT contact_registration_pkey PRIMARY KEY (id);


CREATE TABLE public.beacon_report (
    beacon_id character varying NOT NULL,
    tcn_base64 character varying NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);

ALTER TABLE ONLY public.beacon_report ADD CONSTRAINT beacon_report_pkey PRIMARY KEY (beacon_id);