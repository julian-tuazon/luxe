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
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_uq";
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
    price integer NOT NULL,
    quantity integer NOT NULL,
    CONSTRAINT positive_quantity_check CHECK ((quantity > 0))
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
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    "zipCode" text NOT NULL
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

COPY public."cartItems" ("cartItemId", "cartId", "productId", price, quantity) FROM stdin;
971	97	4	1499	1
913	90	5	599	2
735	79	4	1499	1
879	87	6	499	3
1020	103	4	1499	99
956	95	3	799	1
957	95	5	599	2
880	87	4	1499	1
869	80	2	899	4
870	81	4	1499	1
871	82	4	1499	2
1120	102	5	599	11
1113	102	1	1699	16
872	83	3	799	2
877	87	3	799	5
907	89	3	799	15
1140	105	3	799	81
970	99	3	799	66
924	91	1	1699	5
874	84	3	799	1
875	85	6	499	1
1022	103	2	899	99
876	86	2	899	3
920	91	2	899	11
1144	106	2	899	20
952	94	4	1499	7
955	93	2	899	1
1145	107	5	599	1
1146	107	3	799	2
953	93	5	599	8
1148	108	5	599	1
884	88	6	499	1
977	100	3	799	1
979	100	4	1499	1
980	100	1	1699	1
934	92	2	899	25
962	98	5	599	1
935	92	3	799	6
982	96	1	1699	6
961	98	3	799	7
983	101	5	599	28
1129	102	2	899	96
1133	102	3	799	1
1150	110	6	499	36
1151	111	6	499	1
1139	104	5	599	1
1152	112	6	499	5
1153	113	6	499	1
1154	114	2	899	5
1155	115	6	499	1
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
73	2020-04-11 23:02:18.700212-07
74	2020-04-12 00:50:04.980212-07
75	2020-04-12 01:48:32.675239-07
76	2020-04-12 01:52:10.677893-07
77	2020-04-12 02:54:02.710895-07
78	2020-04-12 03:50:20.598306-07
79	2020-04-12 22:04:04.666313-07
80	2020-04-14 17:13:19.741936-07
81	2020-04-14 21:33:14.978035-07
82	2020-04-14 21:33:57.148033-07
83	2020-04-14 21:34:43.851026-07
84	2020-04-14 21:35:45.725901-07
85	2020-04-14 21:37:56.804919-07
86	2020-04-14 21:40:33.593792-07
87	2020-04-14 21:41:35.780585-07
88	2020-04-14 21:57:22.872152-07
89	2020-04-14 22:04:42.478798-07
90	2020-04-14 23:17:45.73422-07
91	2020-04-14 23:34:05.674338-07
92	2020-04-15 00:09:05.880701-07
93	2020-04-15 00:34:49.129917-07
94	2020-04-15 05:13:14.080162-07
95	2020-04-15 06:32:35.098785-07
96	2020-04-15 06:45:57.998905-07
97	2020-04-15 07:15:50.767912-07
98	2020-04-15 07:23:35.892769-07
99	2020-04-15 07:27:22.10573-07
100	2020-04-15 08:04:51.854434-07
101	2020-04-15 09:29:52.574973-07
102	2020-04-15 09:33:44.169791-07
103	2020-04-15 15:24:59.100438-07
104	2020-04-18 23:38:00.637158-07
105	2020-04-18 23:51:33.546019-07
106	2020-04-20 11:54:06.263162-07
107	2020-04-20 11:56:39.081984-07
108	2020-04-20 16:19:04.723237-07
109	2020-04-20 16:57:20.95471-07
110	2020-05-01 20:59:34.953802-07
111	2020-05-02 22:08:54.187862-07
112	2020-05-02 23:04:00.28677-07
113	2020-05-02 23:04:41.399899-07
114	2020-05-02 23:12:35.452825-07
115	2020-05-02 23:19:40.206563-07
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt", city, state, "zipCode") FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
4	Tabletop Fireplace	1499	/images/fireplace.jpg	A contemporary miniature fireplace that radiates warmth and light.	The Tabletop Fireplace is a beautiful miniature fireplace, with both contemporary (two stainless steel logs) and natural (slate base) components. In addition to creating a beautiful focal point for your table, it also radiates warmth and light for a cozy experience. Features two 7.5" 18/10 stainless steel oil lamps and a slate base, and uses liquid paraffin lamp oil.
2	Exquisite Blanket	899	/images/blanket.jpg	A delightfully soft and warm blanket constructed with high-quality wool.	An extraordinary, luxurious blanket made from superfine Australian Merino wool yarn, one of the softest fibers available. This product is unbelievably soft, warm, and pleasant to touch. Dry clean only. When soiled, this blanket should be taken to a professional dry cleaner to maintain its superior quality.
6	Leather Travel Bag	499	/images/bag.jpg	A gorgeous full grain leather bag for carrying your electronic devices on the go.	This beautiful bag boasts excellent craftsmanship and is made with high-quality full grain leather, linen, and Italian waxed thread. Features a stash/concealed pocket for valuables, an optional handle, a dedicated Apple Pencil holder, seven elastic slots, hand stitched pull tabs, and metallic YKK zippers. Fits a 10.5" iPad and all Amazon Kindles.
5	Winebreather Carafe	599	/images/wine.jpg	An innovative apparatus that adds 10 times more oxygen to your wine.	The Winebreather Carafe is the most effective aerator on the market and was the undisputed winner of a Eurofin aerating test. Simply press the decanter onto the top of an opened bottle of wine and flip it over so the wine pours into the decanter. You can serve the wine directly from the beautifully designed carafe, or flip it back over once it's done to pour the aerated wine back to serve directly from the original bottle.
1	Kinetic Wall Clock	1699	/images/clock.jpg	A sculptural clock that creates visually appealing geometric shapes.	This minimal, sculptural clock is designed to create interesting aesthetic forms through the use of the angular hour and minute hands that play on mathematical tangential relations and triangular forms. It is not just a clock. It is a kinetic sculpture that alters its shape through time. Everything you need is included in the package and all you need to do is pick a nice spot in your house and imagine how this clock can transform your living space.
3	London Chess Set	799	/images/chess.jpg	An elegant chess set based on buildings in the London skyline.	We have selected the highest quality materials to create beautiful and unique objects for both the chess player and design enthusiast alike. The 32-piece set is cast in injection molded acrylic. Each piece is double weighted and has a soft felt base.
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 1155, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 115, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 70, true);


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
-- Name: cartItems cartItems_uq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_uq" UNIQUE ("cartId", "productId");


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

