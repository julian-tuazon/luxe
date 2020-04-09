--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_pkey";
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE public."products_productId_seq";
DROP TABLE public.products;
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP SEQUENCE public."cartItems_cartItemId_seq";
DROP TABLE public."cartItems";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
85	29	3	2900
86	29	3	2900
87	29	3	2900
88	29	3	2900
89	29	3	2900
90	29	3	2900
91	29	3	2900
92	29	3	2900
93	29	3	2900
94	29	3	2900
95	29	3	2900
96	29	3	2900
97	29	3	2900
98	29	3	2900
99	29	3	2900
100	29	3	2900
101	29	2	2595
102	30	1	2999
103	30	2	2595
104	30	2	2595
105	30	2	2595
106	30	3	2900
107	30	1	2999
108	30	3	2900
109	30	3	2900
110	30	3	2900
111	30	3	2900
112	30	3	2900
113	30	3	2900
114	30	3	2900
115	30	3	2900
116	30	1	2999
117	30	1	2999
118	30	1	2999
119	30	2	2595
120	30	2	2595
121	31	1	2999
122	32	3	2900
123	32	2	2595
124	32	5	9900
125	32	4	999
126	32	1	2999
127	32	2	2595
128	33	2	2595
129	34	2	2595
130	35	1	2999
131	35	2	2595
132	36	2	2595
133	36	3	2900
134	37	1	2999
135	37	2	2595
136	37	6	830
137	38	1	2999
138	38	2	2595
139	39	1	2999
140	39	2	2595
141	40	3	2900
142	41	2	2595
143	41	2	2595
144	41	2	2595
145	41	2	2595
146	41	2	2595
147	41	2	2595
148	41	2	2595
149	41	2	2595
150	41	2	2595
151	41	2	2595
152	41	2	2595
153	41	2	2595
154	42	3	2900
155	43	2	2595
156	44	2	2595
157	44	1	2999
158	44	2	2595
159	44	2	2595
160	45	3	2900
161	46	2	2595
162	46	2	2595
163	47	1	2999
164	47	3	2900
165	48	3	2900
166	49	2	2595
167	49	3	2900
168	50	3	2900
169	50	6	830
170	51	3	2900
171	52	2	2595
172	53	2	2595
173	53	3	2900
174	54	3	2900
175	55	2	2595
176	55	1	2999
177	56	2	2595
178	56	2	2595
179	57	1	2999
180	58	2	2595
181	59	2	2595
182	60	2	2595
183	61	1	2999
184	62	2	2595
185	63	2	2595
186	64	2	2595
187	65	3	2900
188	65	1	2999
189	66	2	2595
190	67	2	2595
191	68	1	2999
192	69	1	2999
193	69	1	2999
194	69	1	2999
195	69	1	2999
196	69	1	2999
197	69	3	2900
198	70	2	2595
199	70	3	2900
200	70	1	2999
201	71	1	2999
202	71	2	2595
203	72	1	2999
204	72	5	9900
205	72	4	999
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
30	2020-03-10 14:18:25.854836-07
31	2020-03-10 15:40:03.059839-07
32	2020-03-10 15:45:46.941766-07
33	2020-03-10 17:58:54.386738-07
34	2020-03-10 18:00:49.71598-07
35	2020-03-10 18:02:14.494708-07
36	2020-03-10 23:14:22.955368-07
37	2020-03-11 01:22:56.3225-07
38	2020-03-11 02:06:31.039126-07
39	2020-03-11 10:33:40.559997-07
40	2020-03-11 10:34:12.569082-07
41	2020-03-11 13:20:38.267333-07
42	2020-03-11 13:24:58.546286-07
43	2020-03-11 13:25:16.309413-07
44	2020-03-11 13:54:53.80629-07
45	2020-03-11 14:07:57.376929-07
46	2020-03-11 14:08:13.833393-07
47	2020-03-11 14:48:57.093233-07
48	2020-03-11 17:23:09.075298-07
49	2020-03-11 17:28:36.986193-07
50	2020-03-11 18:10:34.778356-07
51	2020-03-11 18:24:25.782624-07
52	2020-03-11 18:25:36.916117-07
53	2020-03-11 23:22:13.39474-07
54	2020-03-12 10:20:33.593893-07
55	2020-03-12 16:47:24.446731-07
56	2020-03-12 16:47:41.320774-07
57	2020-03-12 16:50:44.345027-07
58	2020-03-12 16:56:17.889394-07
59	2020-03-12 16:56:30.719253-07
60	2020-03-12 16:57:03.117845-07
61	2020-03-12 17:00:57.97977-07
62	2020-03-12 17:23:44.235376-07
63	2020-03-12 17:25:24.042033-07
64	2020-03-12 17:31:29.276106-07
65	2020-03-12 21:33:00.354281-07
66	2020-04-08 16:53:55.897532-07
67	2020-04-08 16:56:49.915596-07
68	2020-04-08 17:20:05.068877-07
69	2020-04-08 17:34:18.921235-07
70	2020-04-08 18:13:13.599029-07
71	2020-04-08 23:54:59.77074-07
72	2020-04-09 04:41:09.701506-07
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
1	33	Mikey Chacn	234234234	123 LearningLane	2020-03-10 17:59:01.790608-07
2	34	Mikey Chacn	234234234	123 LearningLane	2020-03-10 18:01:08.071971-07
3	35	Mikey Chacn	234234234	LearningLane	2020-03-10 18:05:55.050885-07
4	36	Hey	283482	1234 Front Lane	2020-03-11 01:07:31.578648-07
5	37	Lannister	34343434	1234 Kings landing	2020-03-11 02:06:18.019131-07
6	38	Lannister boi	1232312312	123 Kings Landing	2020-03-11 02:06:52.674815-07
7	39	fasdfasdfasdf	234234323423	1232131 doo doo lane	2020-03-11 10:34:01.236633-07
8	40	Frank Dudeo	2383488384838483	12345 Shipping Lane	2020-03-11 13:20:34.574466-07
9	41	sdfsdf	32343	asdfasdfa	2020-03-11 13:24:49.909459-07
10	42	sdfsdf	23	23234f sta	2020-03-11 13:25:08.34569-07
11	43	her dfsdf	234234	asdf 23423 	2020-03-11 13:45:53.689296-07
12	44	afsdasfdsafasd	2343434	sdfsdfsd	2020-03-11 14:07:50.521622-07
13	45	adsfssdfadsfsa	234234234234234	asdfsdfasdfasdfasdfadfasz	2020-03-11 14:08:09.271827-07
14	46	sdfffffffffffffffsdfffffffffffffffsdfffffffffffffffsdffffffffffffff	2222222222222222	sdfffffffffffffffsdfffffffffffffffsdfffffffffffffffsdfffffffffffffffsdfffffffffffffffsdfffffffffffffffsdfffffffffffffffsdfffffffffffffffsdfffffffffffffffsdf	2020-03-11 14:48:53.479776-07
15	47	 sdddddddddd	2222222222222222	ds 	2020-03-11 17:23:01.102725-07
16	48	 	3333333333333333	fd	2020-03-11 17:23:20.460108-07
17	49	lawrence 	1234567812345678	343434343 lawrence lane	2020-03-11 18:10:28.877591-07
18	50	sdfsdfsd	3333333333	 	2020-03-11 18:24:21.453198-07
19	51	Danny The beast	3423423423423423	Torrance Mansion where we party evernight	2020-03-11 18:25:02.620847-07
20	54	adsfasdfasdfsfasfsfsdffsdfs	2333333333333333	adsfasdfasdfsfasfsfsdffsdfsadsfasdfasdfsfasfsfsdffsdfsadsfasdfasdfsfasfsfsdffsdfsadsfasdfasdfsfasfsfsdffsdfs	2020-03-12 16:46:39.068602-07
21	55	sdfdsfsdf	2343243432423423	23432434324234232343243432423423	2020-03-12 16:47:35.226245-07
22	56	asdfsdf	2343243432423422	sdfsfsdfdsfdsfssdfsdfdsf	2020-03-12 16:48:37.901568-07
23	57	asssd	3333333333333333	dddddddddddddddddddddddddddddddddddddddddddddddddddddffddddddddddddddddd	2020-03-12 16:52:51.180277-07
24	58	asdfasdfsfsdfsdfsdfsdfsd	3333333333333333	asdfasdfsfsdfsdfsdfsdfsdasdfasdfsfsdfsdfsdfsdfsd	2020-03-12 16:56:27.637224-07
25	59	dfsdfsdfdsfsdfds	3333333333333333	asdfasdfasdfsdfsdfsdfsdfsd	2020-03-12 16:56:55.515441-07
26	60	sddd d	3333333333333333	333333333333333333333333333333333333333333333333	2020-03-12 17:00:38.631527-07
27	62	yessss	2222222222222222	asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfadfasdfasdfsdafsdfasdfasdfasdfasdfasdfasdfadfasdfadsfas	2020-03-12 17:24:35.06384-07
28	63	yessss	2222222222222222	asdfasdfasdfasdfasdfasdfasdfasdfasdfa	2020-03-12 17:29:59.27232-07
29	64	yessss	1111111111111111	asdfasdfasdfasdfasdfasdfasdfasdfasdfa	2020-03-12 17:32:27.890008-07
30	61	asdfsadfdsf	3333333333333333	asdfasdfasdfasdfadfasdfadsfasdfasdfsf	2020-03-12 17:37:32.11092-07
31	66	Jhond	3333333333333333	12345 Strong Lanedfddfd	2020-04-08 16:56:32.424462-07
32	67	fsdfs	3222222222222222	2asdf asdffdsfsfdsddd	2020-04-08 16:57:29.564622-07
33	68	fsdfdsfsfdsf	3333333333333333	asdf 342 333333333333333333333333333333333333333333333333	2020-04-08 17:20:16.479357-07
34	69	fsfsdfsdfsdfsdf	3333333333333333	asdfasdfs 3423423423 sdfsdfsdfs	2020-04-08 17:34:33.494181-07
35	70	aaaaaaaaaaaaaaaaaaaaaa	3333333333333333	aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa	2020-04-08 23:34:13.678977-07
36	71	ddasdasdasdasdasdsadasdsadasdasdasdsadasdasdasdasdasdasdas	3333333333333333	ddasdasdasdasdasdsadasdsadasdasdasdsadasdasdasdasdasdasdas	2020-04-09 04:40:29.514554-07
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
2	Exquisite Blanket	899	/images/blanket.jpg	A delightfully soft and warm blanket constructed with high-quality wool.	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90s. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock. Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
4	Table Top Fireplace	1499	/images/fireplace.jpg	A contemporary miniature fireplace that radiates warmth and light.	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90s. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock. Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
6	Tobacco Leather Travel Bag	499	/images/bag.jpg	A gorgeous full grain leather bag for carrying your electronic devices on the go.	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90s. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock. Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
5	Winebreather Carafe	599	/images/wine.jpg	The innovative Winebreather Carafe adds 10 times more oxygen to your wine in under 2 minutes.	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90s. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock. Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
1	Silo Wall Clock	1699	/images/clock.jpg	A simplistic sculptural clock that creates visual appeal through mathematical tangential relations and triangular forms.	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90s. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock. Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
3	London Skyline Chess Set	799	/images/chess.jpg	An elegant chess set based on buildings in the London skyline.	Lorem ipsum dolor amet fashion axe pour-over jianbing, adaptogen waistcoat tacos master cleanse pitchfork next level. Thundercats pour-over chartreuse 90s. Master cleanse hot chicken ennui offal. Freegan slow-carb offal hell of. Umami polaroid wolf slow-carb next level. Gentrify cardigan seitan, kombucha tacos chambray roof party typewriter man braid. Tote bag lo-fi hell of chia fam hammock. Aesthetic photo booth la croix, vaporware leggings biodiesel man braid tumeric skateboard tousled slow-carb four dollar toast synth pabst pickled. Typewriter church-key chia slow-carb vice gochujang actually. Shoreditch austin woke hot chicken, single-origin coffee ugh affogato four loko green juice. Migas iPhone four dollar toast mustache.
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 205, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 72, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 36, true);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

