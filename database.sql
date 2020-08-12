CREATE TABLE public.contact_registration (
    id bigint NOT NULL,
    phoneNumber character varying,
    registration_time timestamp without time zone,
    is_primary boolean,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);

CREATE SEQUENCE public.contact_registration_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

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

CREATE TABLE public.interaction_calibration (
    id bigint NOT NULL,
    device_model smallint NOT NULL,
    contact_device_model smallint NOT NULL,
    distance_detected decimal NOT NULL,
    created_at timestamp(6) without time zone NOT NULL
);

CREATE SEQUENCE public.interaction_calibration_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.interaction_calibration_id_seq OWNED BY public.interaction_calibration.id;
ALTER TABLE ONLY public.interaction_calibration ALTER COLUMN id SET DEFAULT nextval('public.interaction_calibration_id_seq'::regclass);
SELECT pg_catalog.setval('public.interaction_calibration_id_seq', 1, true);
ALTER TABLE ONLY public.interaction_calibration ADD CONSTRAINT interaction_calibration_pkey PRIMARY KEY (id);