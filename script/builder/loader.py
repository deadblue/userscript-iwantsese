__author__ = 'deadblue'

import json
import logging
import os
import os.path as ospath

from .types import Handler, Source


_logger = logging.getLogger(__name__)


def _load_handler(hd_dir: str) -> Handler:
    code_path = ospath.join(hd_dir, 'code.js')
    domain_path = ospath.join(hd_dir, 'domain.txt')
    hdl = Handler(
        name=ospath.basename(hd_dir),
        code='',
        domains=[]
    )
    with open(code_path, 'r') as fp:
        hdl.code = fp.read().strip()
    with open(domain_path, 'r') as fp:
        for domain in fp:
            domain = domain.strip()
            if domain != '':
                hdl.domains.append(domain)
    return hdl


def load_source(src_dir: str) -> Source:
    source = Source(
        dir_path=src_dir,
        handlers=[]
    )
    _logger.info('Scanning handlers ...')
    for entry in os.scandir(ospath.join(src_dir, 'handlers')):
        if not entry.is_dir(): continue
        h = _load_handler(entry.path)
        if h.code == '' or len(h.domains) == 0:
            _logger.warning('Skip invalid handler: %s', h.name)
        else:
            _logger.info('Find handler: %s', h.name)
            source.handlers.append(h)
    source.handlers.sort(key=lambda h:h.name)
    return source
