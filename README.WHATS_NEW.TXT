
1.  Routing is a bit more robust.
    And the routing table (tab_daw) can be thought of
    as clusters of 3 things.

    1 of 3:[  URL / KEY / SHORTCUT / PATH / ROUTE ]
    2 of 3:[  DATA                                ]
    3 of 3:[  ACTION / WHATEVER                   ]

    For simplification, I think it might be easiest for you
    to mentally abstract it as:

    1: Url
    2: Data
    3: Action to perform on data.

2.  HN2_SQL_Get_Tes : SQL Get Test
    A piece of code testing if we can retrieve a file
    a a string which will later be used to execute SQL
    from a file on disk.
    
3.  HN2_Get_Fas : Get FileAsString
    Uses the same logic as [ HN2_Ser_Fil ] but wraps
    the filesystem logic in a promise. This will make
    it easy to use for database logic that needs to
    load SQL source from external [ sql / text ] files
    on the server.

