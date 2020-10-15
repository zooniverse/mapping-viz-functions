--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.20
-- Dumped by pg_dump version 9.5.23

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: pg_buffercache; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pg_buffercache WITH SCHEMA public;


--
-- Name: EXTENSION pg_buffercache; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_buffercache IS 'examine the shared buffer cache';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA public;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track execution statistics of all SQL statements executed';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: subjects; Type: TABLE; Schema: public; Owner: mapping_viz_production
--

CREATE TABLE public.subjects (
    id integer NOT NULL,
    latitude numeric,
    longitude numeric,
    date date,
    metadata jsonb,
    media_location text,
    subject_set_id integer,
    kelp_km2 numeric,
    temperature_grid_index integer
);


ALTER TABLE public.subjects OWNER TO mapping_viz_production;

--
-- Name: subjects_id_seq; Type: SEQUENCE; Schema: public; Owner: mapping_viz_production
--

CREATE SEQUENCE public.subjects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subjects_id_seq OWNER TO mapping_viz_production;

--
-- Name: subjects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mapping_viz_production
--

ALTER SEQUENCE public.subjects_id_seq OWNED BY public.subjects.id;


--
-- Name: temperatures; Type: TABLE; Schema: public; Owner: mapping_viz_production
--

CREATE TABLE public.temperatures (
    id integer NOT NULL,
    latitude numeric,
    longitude numeric,
    temp_celsius numeric,
    date date,
    temperature_grid_index integer
);


ALTER TABLE public.temperatures OWNER TO mapping_viz_production;

--
-- Name: temperatures_id_seq; Type: SEQUENCE; Schema: public; Owner: mapping_viz_production
--

CREATE SEQUENCE public.temperatures_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.temperatures_id_seq OWNER TO mapping_viz_production;

--
-- Name: temperatures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mapping_viz_production
--

ALTER SEQUENCE public.temperatures_id_seq OWNED BY public.temperatures.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: mapping_viz_production
--

ALTER TABLE ONLY public.subjects ALTER COLUMN id SET DEFAULT nextval('public.subjects_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: mapping_viz_production
--

ALTER TABLE ONLY public.temperatures ALTER COLUMN id SET DEFAULT nextval('public.temperatures_id_seq'::regclass);


--
-- Name: subjects_pkey; Type: CONSTRAINT; Schema: public; Owner: mapping_viz_production
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (id);


--
-- Name: temperatures_pkey; Type: CONSTRAINT; Schema: public; Owner: mapping_viz_production
--

ALTER TABLE ONLY public.temperatures
    ADD CONSTRAINT temperatures_pkey PRIMARY KEY (id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: azure_superuser
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM azure_superuser;
GRANT ALL ON SCHEMA public TO azure_superuser;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: TABLE subjects; Type: ACL; Schema: public; Owner: mapping_viz_production
--

REVOKE ALL ON TABLE public.subjects FROM PUBLIC;
REVOKE ALL ON TABLE public.subjects FROM mapping_viz_production;
GRANT ALL ON TABLE public.subjects TO mapping_viz_production;


--
-- Name: TABLE temperatures; Type: ACL; Schema: public; Owner: mapping_viz_production
--

REVOKE ALL ON TABLE public.temperatures FROM PUBLIC;
REVOKE ALL ON TABLE public.temperatures FROM mapping_viz_production;
GRANT ALL ON TABLE public.temperatures TO mapping_viz_production;


--
-- PostgreSQL database dump complete
--

